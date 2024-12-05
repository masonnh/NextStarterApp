"use server";

import { stripeClient } from "@/utils/stripe/stripe";
import type { Stripe } from "stripe";
import { License } from "@/utils/user/license/license";

// This function returns a list of Stripe products NOT including license information
export const getProducts = async () => {
  console.log("Cache miss on products");
  // Get the list of licenses
  const licenses = Object.values(License.ByProductId);

  // Map those to Stripe products
  const products = await Promise.all(
    licenses.map((license) => stripeClient.products.retrieve(license.productId))
  );

  // Get prices for each of them and filter out any missing products
  const productsWithPrices = (
    await Promise.all(
      products.map(async (product) => {
        if (typeof product.default_price != "string") {
          return;
        }
        const price = await stripeClient.prices.retrieve(product.default_price);

        return {
          ...product,
          price: price as Stripe.Price,
        };
      })
    )
  ).filter((product) => !!product);

  // Map those to keys and fix up data as needed
  const productInfo = productsWithPrices.map(
    (
      product
    ): {
      price: string;
      priceId: string;
      lookupKey: string | undefined;
      name: string;
      description: string;
      id: string;
    } => ({
      price: product.price.unit_amount
        ? product.price.unit_amount / 100 + " " + product.price.currency
        : "Invalid price",
      priceId: product.price.id,
      lookupKey: product.price.lookup_key ?? undefined,
      name: product.name,
      description: product.description ?? "",
      id: product.id,
    })
  );

  return productInfo;
};