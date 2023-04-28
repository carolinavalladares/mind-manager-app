import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "unauthorized", status: 401 });
  } else {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    try {
      const tokenInfo = await jose.jwtVerify(token, secret);

      const response = NextResponse.next();

      //   append user info so routes have access to the info
      response.headers.append("user", JSON.stringify(tokenInfo.payload));

      return response;
    } catch (error) {
      return NextResponse.json({
        error,
        status: 400,
        message: "Invalid token",
      });
    }
  }
}

export const config = {
  matcher: ["/api/auth/user", "/api/auth/delete_account", "/api/list/:path*"],
};
