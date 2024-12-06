"use server";

import { stripeClient } from "@/utils/stripe/stripe";
import type { Stripe } from "stripe";
import { License } from "@/utils/user/license/license";
import { Plan } from "@/utils/user/license/plan";

// This function returns a Plan, which is a stripe product combined with the associated license
export const getPlans = async (): Promise<Plan[]> => {
    console.log("Cache miss on products");

    // Get the list of licenses except for the Free license
    const licenses = Object.values(License.ByProductId);

    // Retrieve Stripe products based on license product IDs
    const products = await Promise.all(
        licenses.map(async (license) => {
            try {
                const product = await stripeClient.products.retrieve(license.productId);

                // Retrieve the price for the product
                if (typeof product.default_price === "string") {
                    const price = await stripeClient.prices.retrieve(product.default_price);

                    return {
                        product,
                        price: price as Stripe.Price,
                        license,
                    };
                }
                return null;
            } catch (error) {
                console.error(`Failed to retrieve product or price for ${license.productId}`, error);
                return null;
            }
        })
    );

    // Filter out any null or missing products
    const validProducts = products.filter((item) => item !== null);

    // Map products, prices, and licenses into Plan objects
    const plans = validProducts.map(({ product, price, license }) => {
        return new Plan(
            license.id,
            product.id,
            product.name,
            product.description ?? "",
            price.unit_amount
                ? price.unit_amount / 100 + " " + price.currency
                : "Invalid price",
            price.id,
            price.lookup_key ?? undefined,
            license.features,
            license.storage
        );
    });

    // Add the Free License manually at the beginning of the array
    plans.unshift(
        new Plan(
            0,
            License.Free.productId,   // This could be an empty string or a custom ID
            License.Free.name,
            "Enjoy basic features for free.",
            "0 usd",
            "freetrial",                       // No price ID for free
            undefined,                // No lookup key for free
            License.Free.features,
            License.Free.storage
        )
    );

    return plans;
};
