import { auth } from "@/lib/firebaseAdmin";
import { NextRequest } from "next/server";

export default async function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
