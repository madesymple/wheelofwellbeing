"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { CheckIcon } from "./icons";
import IconBoxHero from "./cards/iconBoxHero";
import { motion } from "motion/react";

const Pricing = (): JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row lg:flex items-center justify-center  space-x-0 lg:space-x-10 space-y-10 lg:space-y-0">
        <motion.div
          // variants={{
          //   hidden: { opacity: 0 },
          //   visible: { opacity: 1 },
          // }}
          // initial="hidden"
          // whileInView="visible"
          // transition={{
          //   delay: 0.5,
          //   duration: 0.5,
          //   ease: "easeInOut",
          // }}
          className="h-[600px] md:h-[850px] w-full bg-[#F5F5F5] rounded-3xl p-6 lg:p-8 xl:p-16 border"
        >
          <span className="text-black">Hobby</span>
          <div className="flex items-end gap-1 my-9">
            <span className="text=[#737373] font-semibold">$</span>
            <span className="text-4xl md:text-7xl text-black -mb-1 font-bold">
              99
            </span>
            <span className="text=[#737373]">/month</span>
          </div>
          <Button variant="primary" className="my-10">
            Get Hobby
          </Button>
          <div className="space-y-2">
            {[
              "Access to basic analytics reports",
              "Up to 10,000 data points per month",
              "Email support",
              "Community forum access",
              "Cancel anytime",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-1">
                <CheckIcon color="#000000" />
                <p className="text-sm md:text-base mt-1">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          // variants={{
          //   hidden: { opacity: 0, translateY: "10%" },
          //   visible: { opacity: 1, translateY: "0%" },
          // }}
          // initial="hidden"
          // whileInView="visible"
          // transition={{
          //   delay: 0.3,
          //   duration: 0.5,
          //   ease: "easeInOut",
          // }}
          className="relative h-[1050px] w-full my-16 md:my-0 bg-brand rounded-3xl p-6 lg:p-8 xl:p-16 border shadow-[0px_10px_23px_0px_#0000001a,0px_41px_41px_0px_#00000017,0px_92px_55px_0px_#0000000d,0px_164px_66px_0px_#00000003,0px_257px_72px_0px_#00000000]"
        >
          <div className="flex items-center justify-between">
            <span className="text-white text-lg font-semibold">Starter</span>
            <div className="bg-white py-1 px-3 rounded-full">Featured</div>
          </div>
          <div className="flex items-end gap-1 my-9">
            <span className="text-white font-semibold">$</span>
            <span className="text-4xl md:text-4xl md:text-7xl text-white -mb-1 font-bold">
              299
            </span>
            <span className="text-white font-bold">/month</span>
          </div>
          <Button variant="secondary" className="my-10">
            Get Starter
          </Button>
          <div className="space-y-3">
            {[
              "Advanced analytics dashboard",
              "Customizable reports and charts",
              "Real-time data tracking",
              "Integration with third-party tools",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <CheckIcon textColor="#2BC8FD" color="#ffffff" />
                <p className="text-white text-sm md:text-base mt-0.5">{item}</p>
              </div>
            ))}
          </div>
          <Saprator className="my-16" />
          <div className="space-y-3">
            {[
              "Access to basic analytics reports",
              "Community forum access",
              "Unlimited Tokens",
              "24x7 Support",
              "Everything in Hobby Plan",
              "Cancel anytime",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <CheckIcon textColor="#2BC8FD" color="#ffffff" />
                <p className="text-white text-sm md:text-base mt-1">{item}</p>
              </div>
            ))}
          </div>

          <div className="absolute md:-top-20 -top-8 md:-right-6 right-0 rotate-[-15deg]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <IconBoxHero />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          // variants={{
          //   hidden: { opacity: 0 },
          //   visible: { opacity: 1 },
          // }}
          // initial="hidden"
          // whileInView="visible"
          // transition={{
          //   delay: 0.5,
          //   duration: 0.5,
          //   ease: "easeInOut",
          // }}
          className="h-[800px] md:h-[850px] w-full bg-[#F5F5F5] rounded-3xl p-6 lg:p-8 xl:p-16 border"
        >
          <span className="text-black">Pro</span>
          <div className="flex items-end gap-1 my-9">
            <span className="text=[#737373] font-semibold">$</span>
            <span className="text-4xl md:text-7xl text-black -mb-1 font-bold">
              1490
            </span>
            <span className="text=[#737373]">/month</span>
          </div>
          <Button variant="primary" className="my-10">
            Get Pro
          </Button>
          <div className="space-y-2">
            {[
              "Unlimited data storage",
              "Customizable dashboards",
              "Advanced data segmentation",
              "Real-time data processing",
              "AI-powered insights",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <CheckIcon color="#000000" />
                <p className="text-sm md:text-base mt-1">{item}</p>
              </div>
            ))}
          </div>

          <Saprator />
          <div className="space-y-2">
            {["Everything in Hobby Plan", "Cancel anytime"].map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <CheckIcon color="#0EA5E9" />
                <p className="text-sm md:text-base mt-1">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;

const Button = ({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  className?: string;
}) => {
  return (
    <button
      style={{ boxShadow: "0px 4px 14.8px rgba(0, 0, 0, 0.2)" }}
      className={cn(
        "flex items-center justify-center w-full h-10 rounded-2xl p-6 font-medium text-lg",
        variant === "primary"
          ? "bg-gradient-to-b border border-emerald-700 from-emerald-500 to-brand text-white"
          : "bg-white",
        className
      )}
    >
      {children}
    </button>
  );
};

const Saprator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center my-14",
        className
      )}
    >
      <div className="w-full h-0.5 bg-[#E5E5E5]"></div>
      <div className="absolute left-1/2 flex items-center justify-center size-6 rounded-full bg-white text-[#515151] -ml-2 text-2xl shadow-[0px_0px_0px_0px_#00000000,0px_0px_0px_0px_#00000000,0px_-1px_0px_0px_#E5E5E5]">
        <span className="-mt-1">+</span>
      </div>
    </div>
  );
};
