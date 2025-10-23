import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/library/stripe/stripe";
import { auth } from "@/library/auth/auth";

export async function GET(req: NextRequest) {
  try {
    // 检查用户是否已登录
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 从session中获取用户ID
    const userId = session.user.id || "abc123"; // 从session或JWT token中获取
    
    const checkoutSession = await stripe.checkout.sessions.retrieve("cs_test_a1GcVROjDOsCqouEa7SXrUH1WOFzjS5c1aaMnyUhHGjRtT0hEykEWtbK2z");
    // 查找用户的订阅
    const subscriptions = await stripe.subscriptions.list({
      customer: checkoutSession.customer as string,
  
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      );
    }   
  

    const subscription = subscriptions.data[0];

    // 获取价格信息
    const price = subscription.items.data[0].price;
    const product = price.product as any;

    const subscriptionData = {
      id: subscription.id,
      status: subscription.status,
      current_period_end: subscriptions.data[0].items.data[0].current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      plan: {
        name: product.name || "Premium Plan",
        amount: price.unit_amount || 0,
        currency: price.currency || "cny",
      },
    };

    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
