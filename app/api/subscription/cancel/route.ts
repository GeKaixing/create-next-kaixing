import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/library/stripe/stripe";
import { auth } from "@/library/auth/auth";

export async function POST(req: NextRequest) {
  try {
    // 检查用户是否已登录
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // 更新订阅，设置为在当前计费周期结束时取消
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    
    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: subscription.items.data[0].current_period_end,
      },
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
