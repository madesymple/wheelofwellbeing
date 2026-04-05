import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "wow_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SECRET || "fallback-dev-secret-change-me";
}

export function signToken(payload: string): string {
  const hmac = createHmac("sha256", getSecret());
  hmac.update(payload);
  return `${payload}.${hmac.digest("hex")}`;
}

export function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.substring(0, lastDot);
  const expected = signToken(payload);
  return token === expected;
}

export async function setAdminCookie(): Promise<void> {
  const timestamp = Date.now().toString();
  const token = signToken(timestamp);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}
