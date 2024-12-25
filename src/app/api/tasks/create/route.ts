import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../middleware/verifyToken";
import { db } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const decodedToken = await verifyToken(req);

    const { title, description, dueDate, priority } = body;

    if (!title || !dueDate || !priority) {
      return NextResponse.json(
        { message: "Title, dueDate and priority are required" },
        { status: 400 }
      );
    }

    const slug = `${slugify(title, { lower: true, strict: true })}-${uuidv4}`;

    const taskRef = await db.collection(`users/${decodedToken}/tasks`).add({
      title,
      description,
      dueDate,
      priority,
      slug,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Task created successfully.", task: { slug } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: 1101" },
      { status: 500 }
    );
  }
}
