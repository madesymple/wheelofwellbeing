"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Feedbacks = (): JSX.Element => {
  return (
    <div className="w-full flex items-center justify-center mt-10 md:mt-40 mb-10">
      <div className="w-full mx-auto max-w-7xl flex justify-between gap-5">
        <div className="flex gap-6 lg:flex-row flex-col h-full lg:h-[1000px] w-full">
          <div className="space-y-6 w-full">
            <Card
              quote="This platform is revolutionary. I hired my first candidate from Playful recruiting and they turned out to be great. Now since I'm asked to write a bigger review so that it fills the first card, I'll just go on and start writing gibberish. This page is cool, IDK about playful, just go ahead and buy Aceternity Pro."
              name="Manu Arora"
              role="Founder of Aceternity"
              src="/assets/avatar/avatar.png"
              className="lg:h-2/3 bg-white shadow-[0px_14px_30px_0px_#0000000D,0px_54px_54px_0px_#0000000A,0px_122px_73px_0px_#00000008,0px_217px_87px_0px_#00000003,0px_340px_95px_0px_#00000000]"
            />
            <Card
              quote="The team at Playful has been incredible to work with. Their attention to detail and commitment to quality is unmatched."
              name="Dua Lipa"
              role="Founder of my heart"
              src="https://images.unsplash.com/photo-1638347419042-40d24bb64d0d?q=80&w=3130&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="lg:h-1/3"
            />
          </div>
          <div className="space-y-6 w-full">
            <Card
              quote="Working with this platform has transformed our recruitment process. The AI-powered matching system saved us countless hours in finding the perfect candidates. "
              name="Sarah Chen"
              role="Head of Talent, TechVision Inc."
              src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=3445&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="lg:h-1/3"
            />
            <Card
              quote="The level of customization and flexibility in the platform is outstanding. We've been able to adapt it perfectly to our unique hiring workflows, and the results have been phenomenal. The customer support team is always there when we need them."
              name="Emily Nakamura"
              role="Talent Acquisition Director, Future Dynamics"
              src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="lg:h-2/3"
            />
          </div>
          <div className="space-y-6 w-full">
            <Card
              quote="The platform's intuitive interface and powerful analytics have completely revolutionized how we approach talent acquisition."
              name="James Rodriguez"
              role="VP of HR, Global Solutions Ltd."
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="lg:h-1/3"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={
                "flex 2xl:h-2/3 h-[600px] gap-4 justify-center items-end w-full rounded-[35px] bg-[url('/assets/video_banner.png')] bg-cover p-10 bg-[#F5F5F5]"
              }
            >
              <button className="rounded-xl border border-white text-white w-fit text-lg font-semibold bg-white/50 px-8 py-3 flex items-center justify-center">
                Watch Review
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;

const Card: React.FC<{
  className?: string;
  quote?: string;
  src?: string;
  name?: string;
  role?: string;
}> = ({
  className,
  quote = "The ",
  src = "/assets/avatar/avatar.png",
  name = "Manu Arora",
  role = "Founder of Aceternity",
}) => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 10 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.9 }}
      className={cn(
        "flex flex-col gap-4 md:min-h-[600px] xl:min-h-[400px] h-full justify-between w-full rounded-[35px] border border=[#DBDCDE] p-10 bg-[#F5F5F5]",
        className
      )}
    >
      <p className="text-sm md:text-lg text-[#3C3C3C] md:leading-8 font-normal mb-8 max-h-36">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        <Image
          className="rounded-lg aspect-square object-cover"
          src={src}
          alt="avatar"
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          <p className="text-sm md:text-base text-[#4D4D4D] font-normal">
            {name}
          </p>
          <p className="text-xs md:text-sm text-[#1F2534] font-normal">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
