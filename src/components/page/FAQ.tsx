'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Question {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: Question[];
}

export default function FAQ(props: FAQProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h3 className="font-raleway text-2xl font-semibold tracking-tight sm:text-3xl">
        Frequently Asked Questions
      </h3>
      <Accordion
        type="single"
        collapsible
        className="mt-6 rounded-lg border px-4"
      >
        {props.faqs.map((faq: Question, index: number) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
