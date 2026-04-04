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
    <div className="p-6 md:p-10 relative rounded-[35px] border border-brand/10 mt-5 mb-11 overflow-hidden bg-white">
      <div className="flex md:flex-row flex-col gap-10">
        <div className="flex-1">
          <div className="flex gap-2 items-center">
            <span className="text-xl font-heading font-bold text-foreground">
              Wheel of Wellbeing
            </span>
          </div>
          <p className="md:text-lg text-sm text-neutral-600 mt-3 max-w-md">
            Discover your life balance across 8 key areas with our free
            assessment, designed by a licensed therapist.
          </p>
        </div>
        <div className="flex gap-16">
          {(["Pages", "Legal"] as const).map((section) => (
            <div key={section} className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-foreground">
                {section}
              </h3>
              {footerData[section].map((item) => (
                <Link
                  className="text-sm text-neutral-500 hover:text-brand transition-colors"
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
      <div className="border-t border-neutral-200 mt-10 pt-6">
        <p className="text-neutral-400 text-sm text-center">
          &copy; {new Date().getFullYear()} Wheel of Wellbeing. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
