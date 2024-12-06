import { getPlans } from "@/components/pricing/getplans";
import { getEnvVars } from "@/utils/env";
import { stripeClient } from "@/utils/stripe/stripe";
import { createClient } from "@/utils/supabase/server";
import { License } from "@/utils/user/license/license";
import { updateLicense } from "@/utils/user/license/updateLicense";
import { NextRequest } from "next/server";
import { z } from "zod";

const BodyValidator = z.object({
    id: z.string(),
    priceId: z.string(),
});

const { baseUrl } = getEnvVars();
const FREE_TRIAL_ID = License.Free.id;

export async function POST(req: NextRequest) {
    const body = Object.fromEntries((await req.formData()).entries());
    const bodyResult = BodyValidator.safeParse(body);

    const supabase = await createClient()
    const user = await supabase.auth.getUser();

    const plans = await getPlans();
    const FREE_TRIAL_PRICE_ID = plans.find((plan) => plan.id === FREE_TRIAL_ID)?.priceId;

    // No user -> redirect to sign in
    if (user.error) {
        return Response.redirect(`${baseUrl}/login`);
    }

    // Invalid body -> 400
    if (!bodyResult.success) {
        return Response.json({ error: bodyResult.error }, { status: 400 });
    }

    // Handle free trial (not done through Stripe checkout)
    if (FREE_TRIAL_PRICE_ID === bodyResult.data.priceId) {
        try {
            if (user.data.user.email) {
                updateLicense(user.data.user.email, FREE_TRIAL_ID);
            } else {
                return Response.json({ error: "User email is undefined" }, { status: 400 });
            }
            return Response.redirect(`${baseUrl}/pricing/success`);
        } catch (error) {
            console.log('Failed to update license', error);
            throw error;
        }
    }

    // Handle paid plans (done through Stripe checkout)
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