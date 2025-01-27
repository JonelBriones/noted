// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   console.log("middleware:");
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }

//   const { pathname } = req.nextUrl;
//   if (pathname === "/tag") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/"],
// };
