import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import LandingSectionShell from './LandingSectionShell';
import { landingContent } from './landing-content';

export default function LandingFAQSection() {
  const { faq } = landingContent;

  return (
    <LandingSectionShell id="faq" title="FAQ" subtitle={faq.title}>
      <div className="rounded-xl border px-4">
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
