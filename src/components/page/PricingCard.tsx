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
  features: string[];
  special?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
  return (
    <Card className={props.special ? 'border-primary/60' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          {props.planName}
          {props.special ? <Badge>Popular</Badge> : null}
        </CardTitle>
        <CardDescription>
          <span className="text-3xl font-semibold text-foreground">
            {props.price}
          </span>
          <span className="text-muted-foreground"> / {props.period}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />
        <ul className="space-y-2 text-sm text-muted-foreground">
          {props.features.map((feature: string, index: number) => (
            <li key={index}>- {feature}</li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={props.special ? 'default' : 'outline'}
        >
          Select plan
        </Button>
      </CardFooter>
    </Card>
  );
}
