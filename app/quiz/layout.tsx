import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "#FDF8F0", color: "#1A1A2E" }}>
      <header className="w-full px-4 md:px-11 py-4">
        <Link href="/" className="flex gap-2 items-center w-fit">
          <Image
            src="/assets/logo.png"
            alt="Wheel of Wellbeing"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </header>
      <main className="w-full max-w-3xl mx-auto px-4 pb-12">{children}</main>
    </div>
  );
}
