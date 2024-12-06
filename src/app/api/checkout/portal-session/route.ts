import { getEnvVars } from "@/utils/env";
import { stripeClient } from "@/utils/stripe/stripe";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

const { baseUrl } = getEnvVars();

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const user = await supabase.auth.getUser();

    if (user.error) {
        return Response.redirect(`${baseUrl}/login`);
    }

    // Find the customer by email
    const customerResponse = await stripeClient.customers.search({
        query: `email:'${user.data.user.email}'`,
        limit: 1,
    });

    // Take the first one we find (we should only have one if things work right)
    const [customer] = customerResponse.data;

    if (!customer) {
        return Response.json(
            { error: "Failed to retrieve customer" },
            { status: 500 }
        );
    }

    // Get the portal URL from Stripe
    const billingSession = await stripeClient.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${baseUrl}/pricing`,
    });

    if (!billingSession || !billingSession.url) {
        return Response.json(
            { error: "Failed to create session" },
            { status: 500 }
        );
    }

    // Send them there
    return Response.redirect(billingSession.url, 303);
}