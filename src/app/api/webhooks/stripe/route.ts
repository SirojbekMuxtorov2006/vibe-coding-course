import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Single course enrollment
        if (session.metadata?.courseId && session.metadata?.userId) {
          await db.enrollment.create({
            data: {
              userId: session.metadata.userId,
              courseId: session.metadata.courseId,
            },
          });
          
          await db.payment.create({
            data: {
              userId: session.metadata.userId,
              stripePaymentId: session.id,
              amount: (session.amount_total || 0) / 100,
              currency: session.currency || "usd",
              status: "completed",
              plan: "FREE", // It's a one-off payment, not a sub plan
            }
          });
        }
        
        // Subscription handling
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          // Assuming we pass userId in client_reference_id for subscriptions
          const userId = session.client_reference_id;
          
          if (userId) {
            await db.user.update({
              where: { id: userId },
              data: {
                stripeCustomerId: session.customer as string,
                stripeSubId: subscription.id,
                subscriptionPlan: "PRO",
                subscriptionStatus: "ACTIVE",
              },
            });
          }
        }
        break;
      }
      
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        
        const user = await db.user.findUnique({
          where: { stripeSubId: subscription.id },
        });
        
        if (user) {
          await db.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: subscription.status === "active" ? "ACTIVE" : 
                                 subscription.status === "past_due" ? "PAST_DUE" :
                                 subscription.status === "canceled" ? "CANCELED" : "EXPIRED",
            },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
