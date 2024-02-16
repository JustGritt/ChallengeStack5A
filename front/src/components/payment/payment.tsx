import { BooKingPost } from "@/types/Booking";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default async function Pay(
  payload: BooKingPost & { serviceName: string; email?: string }
) {
  const { sessionId } = await fetch("/api/checkout/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());
  const stripe = await stripePromise;
  const { error } = await stripe!.redirectToCheckout({
    sessionId,
  });
}
