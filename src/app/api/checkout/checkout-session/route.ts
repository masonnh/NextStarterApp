import { getEnvVars } from "@/utils/env";
import { stripeClient } from "@/utils/stripe/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { z } from "zod";

const BodyValidator = z.object({
    id: z.string(),
    priceId: z.string(),
});

const { baseUrl } = getEnvVars();

export async function POST(req: NextRequest) {
    const body = Object.fromEntries((await req.formData()).entries());
    const bodyResult = BodyValidator.safeParse(body);

    const supabase = await createClient()
    const user = await supabase.auth.getUser();

    // No user -> redirect to sign in
    if (user.error) {
        return Response.redirect(`${baseUrl}/login`);
    }

    // Invalid body -> 400
    if (!bodyResult.success) {
        return Response.json({ error: bodyResult.error }, { status: 400 });
    }

    const price = await stripeClient.prices.retrieve(bodyResult.data.priceId);

    const session = await stripeClient.checkout.sessions.create({
        line_items: [
        {
            price: price.id,
            quantity: 1,
        },
        ],
        customer_email: user.data.user.email,
        mode: price.recurring ? "subscription" : "payment",
        success_url: `${baseUrl}/pricing/success`,
        cancel_url: `${baseUrl}/pricing`,
    });

    if (!session || !session.url) {
        return Response.json(
        { error: "Failed to create session" },
        { status: 500 }
        );
    }

    return Response.redirect(session.url, 303);
}