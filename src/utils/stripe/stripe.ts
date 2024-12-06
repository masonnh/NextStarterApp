import "server-only";

import { Stripe } from "stripe";
import { getEnvVars } from "@/utils/env";

const { stripeSecretKey } = getEnvVars();

if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY was not provided");
}

export const stripeClient = new Stripe(stripeSecretKey);