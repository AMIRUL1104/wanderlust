import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  // login sesion  info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // return NextResponse.redirect(new URL('/login', request.url))

    const signinUrl = new URL("/login", request.url);
    // Save current page URL to redirect back after login
    signinUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/my-booking", "/profile", "/destinations/:path*"],
};
