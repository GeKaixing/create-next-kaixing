import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/library/stripe/stripe";
import { getUserLocale } from "@/library/i18n/services/locale";
import Stripe from "stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const locale = await getUserLocale();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      locale:locale as Stripe.Checkout.SessionCreateParams.Locale, 
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
