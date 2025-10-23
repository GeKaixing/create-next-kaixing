import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

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

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("📝 Subscription updated:", subscription.id);
      
      if (subscription.cancel_at_period_end) {
        console.log("⚠️ Subscription will be canceled at period end:", subscription.current_period_end);
        // 这里可以发送邮件通知用户订阅将在周期结束时取消
        // 可以更新数据库中的用户订阅状态
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("❌ Subscription canceled:", subscription.id);
      
      // 这里可以：
      // 1. 更新数据库，将用户状态改为非会员
      // 2. 发送取消确认邮件
      // 3. 清理用户数据等
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Success", { status: 200 });
}
