// InfoCard.tsx
// Props: title, accent, text, imgSrc, imgAlt, default
// Usage: <InfoCard title='Create Effortless Forecasts' accent='Effortless' text='Connect your QuickBooks, Track your daily cashflow, Automate your forecasts' imgSrc='img/LineGraph.svg' imgAlt='Cashflow Line Graph' default={true} />

import React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  accent?: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
  default?: boolean;
}

export default function InfoCard(props: InfoCardProps) {
  const renderTitle = () => {
    if (props.accent && props.title) {
      const words = props.title.split(' ');
      return (
        <h2>
          {words.map((word: string, index: number) =>
            word === props.accent ? (
              <span key={index}>
                {index > 0 ? ' ' : ''}
                <span className="text-primary">{word}</span>
              </span>
            ) : (
              <span key={index}>
                {index > 0 ? ' ' : ''}
                {word}
              </span>
            ),
          )}
        </h2>
      );
    }
    return <h2>{props.title}</h2>;
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      <Card className={props.default ? 'bg-muted/40' : ''}>
        <CardContent className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-8">
          {props.default && (
            <div className="order-2 flex justify-center md:order-1">
              <Image
                src={props.imgSrc}
                alt={props.imgAlt}
                width={300}
                height={200}
                className="h-auto w-full max-w-xs"
              />
            </div>
          )}

          <div
            className={`space-y-4 ${props.default ? 'order-1 md:order-2' : 'order-1'}`}
          >
            <div className="font-raleway text-2xl font-semibold tracking-tight sm:text-3xl">
              {renderTitle()}
            </div>
            <p className="text-base text-muted-foreground">{props.text}</p>
          </div>

          {!props.default && (
            <div className="order-2 flex justify-center">
              <Image
                src={props.imgSrc}
                alt={props.imgAlt}
                width={300}
                height={200}
                className="h-auto w-full max-w-xs"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
