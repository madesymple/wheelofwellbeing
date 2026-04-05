import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setAdminCookie } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = (await req.json()) as { password: string };

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    await setAdminCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
