import React from "react";
import Logo from "@/components/logo";

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#FDF8F0", color: "#1A1A2E" }}
    >
      <header className="w-full px-4 md:px-11 py-4">
        <Logo />
      </header>
      {children}
    </div>
  );
}
