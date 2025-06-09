import { getToken, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const token: JWT | null = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  const { pathname } = req.nextUrl;
  if (!token && !pathname.includes("/login")) {
    // Handle the case where the user is not authenticated.
  }
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(
    "x-current-path-item-id",
    req.nextUrl.searchParams.get("id") || "/"
  );
  const response: NextResponse<unknown> = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return response;
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
