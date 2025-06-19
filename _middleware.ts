import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || ""
  const url = req.nextUrl.clone()

  if (!token && (url.pathname.startsWith("/(user)") || url.pathname.startsWith("/(admin)"))) {
  url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  try {
    const user: any = jwtDecode(token)

    if (url.pathname.startsWith("/(admin)") && user.role !== "admin") {
      url.pathname = "/articles"
      return NextResponse.redirect(url)
    }

    if (url.pathname.startsWith("/(user)") && user.role !== "user") {
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }
  } catch {
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/(admin)/:path*", "/(user)/:path*"],
}
