"use client";

import React from "react";
import Link from "next/link";

const footerData = {
  Pages: [
    { name: "Take the Quiz", path: "/quiz" },
    { name: "About", path: "#about" },
    { name: "FAQ", path: "#faq" },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

const Footer = () => {
  return (
    <div
      className="p-8 md:p-12 relative rounded-[35px] border border-brand/10 mt-5 mb-11 overflow-hidden bg-white"
      style={{
        boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      {/* Dot pattern */}
      <div
        className="absolute -z-10 top-0 left-0 w-full h-full opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(42, 157, 143, 0.08) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="flex md:flex-row flex-col gap-10 relative z-10">
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <span className="text-xl font-heading font-bold text-foreground">
              Wheel of Wellbeing
            </span>
          </div>
          <p className="md:text-base text-sm text-neutral-500 mt-3 max-w-md leading-relaxed">
            Discover your life balance across 8 key areas with our free
            assessment, designed by a licensed therapist.
          </p>
        </div>
        <div className="flex gap-16">
          {(["Pages", "Legal"] as const).map((section) => (
            <div key={section} className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-foreground text-sm">
                {section}
              </h3>
              {footerData[section].map((item) => (
                <Link
                  className="text-sm text-neutral-400 hover:text-brand transition-colors"
                  href={item.path}
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-neutral-100 mt-10 pt-6 relative z-10">
        <p className="text-neutral-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Wheel of Wellbeing. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
