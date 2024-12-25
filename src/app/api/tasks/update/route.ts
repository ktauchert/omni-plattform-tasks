import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../middleware/verifyToken";
import { db } from "@/lib/firebaseAdmin";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const decodedToken = await verifyToken(req);

    const { id, title, description, dueDate, priority, slug } = body;

    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }

    if (!title || !dueDate || !priority) {
      return NextResponse.json(
        { message: "Title, dueDate and priority are required" },
        { status: 400 }
      );
    }

    const taskRef = await db
      .collection(`users/${decodedToken}/tasks`)
      .doc(id)
      .update({
        title,
        description,
        dueDate,
        priority,
        slug,
        updatedAt: new Date(),
      });

    return NextResponse.json(
      { message: "Task updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: 1201" },
      { status: 500 }
    );
  }
}
