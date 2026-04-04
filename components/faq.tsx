"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FAQData } from "@/lib/data";
import { motion } from "motion/react";

const FAQSection = () => {
  return (
    <div className="w-full flex justify-center my-16 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="md:w-[70%] w-full flex flex-col items-center justify-center"
      >
        <div className="text-center mb-12">
          <p className="text-brand font-bold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="md:text-5xl text-2xl font-heading font-bold text-foreground">
            Frequently asked questions
          </h2>
        </div>
        <div className="w-full bg-white rounded-[28px] border border-neutral-100 p-6 md:p-10" style={{
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03), 0px 1px 3px rgba(0,0,0,0.05)",
        }}>
          <Accordion type="single" collapsible className="w-full">
            {FAQData.map((item, index) => (
              <div key={index}>
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-500 leading-relaxed">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;
