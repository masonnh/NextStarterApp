import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const stripe = new Stripe(secret, { apiVersion: '2022-11-15' });

export function getWebhookSecret() {
  return webhookSecret;
}
