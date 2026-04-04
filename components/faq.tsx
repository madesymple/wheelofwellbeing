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
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-[80%] w-full flex flex-col items-center justify-center"
      >
        <div className="text-center mb-10">
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="md:text-4xl text-2xl font-heading font-bold text-foreground">
            Frequently asked questions
          </h2>
        </div>
        <div className="md:w-[80%] w-full">
          <Accordion type="single" collapsible className="w-full">
            {FAQData.map((item, index) => (
              <div key={index}>
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left font-heading font-semibold">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 leading-relaxed">
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
