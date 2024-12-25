import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../middleware/verifyToken";
import { db } from "@/lib/firebaseAdmin";
import { messaging } from "firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await verifyToken(req);

    const snapshot = await db.collection(`users/${decodedToken}/tasks`).get();

    const tasks = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error: 1120"}, {status: 500});
  }
}
