"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const Navbar = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div className="relative w-full flex justify-between items-center">
      <Link
        href="/"
        className="flex gap-2 items-center mb-4 md:mb-0 cursor-pointer"
      >
        <Image
          src="/assets/logo.png"
          alt="Wheel of Wellbeing"
          width={160}
          height={40}
          className="h-8 md:h-10 w-auto"
          priority
        />
      </Link>
      <div className="md:flex hidden items-center">
        <TakeQuizButton />
      </div>
      <div className="md:hidden -mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </motion.svg>
          )}
        </motion.button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.1,
              type: "spring",
              stiffness: 1000,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 pt-10 flex flex-col justify-start items-center w-full h-full bg-cream z-50"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleMenu}
              className="fixed top-4 right-4"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            </motion.button>
            <div className="w-3/4 my-4 mt-20">
              <TakeQuizButton />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;

const TakeQuizButton = () => {
  return (
    <Link
      href="/quiz"
      style={{ boxShadow: "0px 4px 14.8px rgba(0, 0, 0, 0.15)" }}
      className="flex items-center justify-center w-full md:w-44 h-11 rounded-xl border border-brand-dark bg-gradient-to-b from-brand-light to-brand text-base font-semibold text-white transition-all hover:opacity-90"
    >
      Take the Quiz
      <ArrowRight className="h-4 w-4 ml-2" />
    </Link>
  );
};

