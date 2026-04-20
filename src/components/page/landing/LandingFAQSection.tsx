import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { landingContent } from './landing-content';
import LandingSectionShell from './LandingSectionShell';

export default function LandingFAQSection() {
  const { faq } = landingContent;

  return (
    <LandingSectionShell id="faq" title="FAQ" subtitle={faq.title}>
      <div className="rounded-xl border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.95))] px-4 dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,0.8))]">
        <Accordion type="single" collapsible>
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </LandingSectionShell>
  );
}
