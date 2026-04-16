import { NextResponse } from 'next/server';
import { stripe, getWebhookSecret } from '@/lib/stripe/server';
import Stripe from 'stripe';

export const runtime = 'edge';

export async function POST(request: Request) {
  const secret = getWebhookSecret();

  const buf = await request.arrayBuffer();
  const payload = Buffer.from(buf);
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook Error: Invalid signature' }, { status: 400 });
  }

  // Handle the event types you care about
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any;
      // TODO: Fulfill the purchase, e.g., create subscription record in DB
      console.log('Checkout session completed:', session.id);
      break;
    case 'invoice.paid':
      // handle invoice paid
      break;
    case 'invoice.payment_failed':
      // handle payment failure
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
