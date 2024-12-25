import Cors, { CorsRequest } from "cors";
import { NextRequest } from "next/server";

const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: [process.env.CORS_ORIGIN as string, "http://localhost:3000"],
});

export function middleware(
  req: Cors.CorsRequest,
  res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
  }
) {
  return new Promise((resolve, reject) => {
    cors(req, res, async (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
