import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest): Promise<NextResponse> {
    // Stripe 需要原始 body（text 而不是 json）
    const body = await req.text();
    const headerStore = headers();
    const sig = (await headerStore).get("stripe-signature");

    if (!sig) {
        console.error("❌ Missing stripe-signature header");
        return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
    }

    try {
        // 验证事件签名
        const event: Stripe.Event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
        console.log(event)
        // 根据事件类型处理逻辑
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(session)
            // ✅ 获取 userId
            const userId = session.metadata?.userId;

            console.log("✅ 支付成功用户 ID：", userId);
            console.log("Stripe Session ID：", session.id);

            // 这里可以：
            // 1. 获取 session.metadata.userId
            // 2. 更新数据库，开通会员
            // 3. 发送邮件等
        }

        return new NextResponse("ok", { status: 200 });
    } catch (err: any) {
        console.error("❌ Webhook 验证失败：", err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
}
