import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../middleware/verifyToken";
import { db } from "@/lib/firebaseAdmin";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const decodedToken = await verifyToken(req);

    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    }

    const taskRef = await db
      .collection(`users/${decodedToken}/tasks`)
      .doc(id)
      .delete();

    return NextResponse.json(
      { message: "Task deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error: 3101" },
      { status: 500 }
    );
  }
}
