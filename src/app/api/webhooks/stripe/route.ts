import { getEnvVars } from "@/utils/env";
import { resolveString } from "@/utils/resolvestring";
import { stripeClient } from "@/utils/stripe/stripe";
import { License } from "@/utils/user/license/license";
import { updateLicense } from "@/utils/user/license/updateLicense";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const { stripeWebhookSecret } = getEnvVars();

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    if (!body || !signature) {
        return Response.json({}, { status: 400 });
    }

    const secret = stripeWebhookSecret;
    if (!secret) {
        return Response.json({}, { status: 500 });
    }

    const event = stripeClient.webhooks.constructEvent(body, signature, secret);

    try {
            switch (event.type) {
            case "customer.subscription.created":
                handleSubscriptionCreated(event.data.object);
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
    } catch (ex) {
        console.error(ex);
        return Response.json({}, { status: 500 });
    }

    return Response.json({}, { status: 200 });
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    console.log(`Subscription created: ${subscription.id}`);
    console.log(subscription);
    const [id, ...rest] = subscription.items.data.map((item) =>
        resolveString(item.plan.product)
    );
    console.log(id);
    if (!id) {
        throw new Error(`No product ID found: ${id}`);
    }

    const customerId = resolveString(subscription.customer);

    const customer = await stripeClient.customers.retrieve(customerId);
    if (customer.deleted) {
        console.log(`Customer ${customerId} deleted`);
        return;
    }

    if (!customer.email) {
        console.log(`Customer ${customerId} has no email`);
        return;
    }

    if (!(await updateLicense(customer.email, License.ByProductId[id].id))) {
        throw new Error(`Failed to update license for ${customer.email}`);
    }
}