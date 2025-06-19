import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value 
  // const url = req.nextUrl.clone()
const useMock= process.env.NEXT_PUBLIC_USE_MOCK= 'true'
  if (useMock && token === 'mocked_token_abc123')  {
    return NextResponse.next()
  }
  if(!token){
    return NextResponse.redirect(new URL('/login',req.url))
  }
  return NextResponse.next()
}

// export const config = {
//   matcher: ["/(admin)/:path*", "/(user)/:path*"],
// }
