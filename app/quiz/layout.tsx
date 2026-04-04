import Link from "next/link";
import React from "react";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="w-full px-4 md:px-11 py-4">
        <Link href="/" className="flex gap-2 items-center w-fit">
          <span className="text-xl font-heading font-bold tracking-tight text-foreground">
            Wheel of Wellbeing
          </span>
        </Link>
      </header>
      <main className="w-full max-w-3xl mx-auto px-4 pb-12">{children}</main>
    </div>
  );
}
