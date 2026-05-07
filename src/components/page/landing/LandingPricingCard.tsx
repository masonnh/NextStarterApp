import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  features: readonly string[];
  special?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
  return (
    <Card
      className={
        props.special
          ? 'border-violet-400 bg-violet-50/60 shadow-lg shadow-violet-200/60 dark:border-violet-500 dark:bg-violet-500/15 dark:shadow-violet-900/30'
          : 'border-slate-200 bg-white/95 shadow-sm dark:border-slate-700 dark:bg-slate-900/85'
      }
    >
      <CardHeader className="space-y-3">
        <CardTitle className="flex items-center justify-between text-xl text-slate-900 dark:text-slate-100">
          {props.planName}
          {props.special ? (
            <Badge className="bg-violet-600 text-white hover:bg-violet-600 dark:bg-violet-400 dark:text-slate-950 dark:hover:bg-violet-400">
              Popular
            </Badge>
          ) : null}
        </CardTitle>
        <CardDescription>
          <span className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {props.price}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {' '}
            / {props.period}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator className="bg-slate-200 dark:bg-slate-700" />
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {props.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={props.special ? 'default' : 'outline'}
          style={
            props.special
              ? undefined
              : {
                  borderColor: 'var(--lp-green)',
                  color: 'var(--lp-green)',
                }
          }
        >
          Select plan
        </Button>
      </CardFooter>
    </Card>
  );
}
