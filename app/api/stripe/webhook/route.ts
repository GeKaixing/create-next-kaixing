import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ 根据事件类型处理逻辑
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Checkout completed:", session.id);

      // 这里可更新数据库中的订单状态
      // e.g. await db.orders.update({ session_id: session.id }, { status: 'paid' });

      break;
    }

    case "invoice.payment_succeeded": {
      console.log("✅ Subscription payment succeeded");
      break;
    }

    case "customer.subscription.deleted": {
      console.log("⚠️ Subscription canceled");
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Success", { status: 200 });
}
