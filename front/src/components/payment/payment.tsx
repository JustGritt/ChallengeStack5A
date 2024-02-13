import { BooKingPost } from "@/types/Booking";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OMwURF9MmQfZRp3FWy76r8hxd5EsxW4GJGN2oXBz8L2Sp97UohCfqcGokB1kGfdX8E5YMMkwd85Dy931aEOhNdU00046RjC2C');

export default async function Pay(payload: BooKingPost & {serviceName: string}){
    const { sessionId } = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }).then(async (res) => {
        const { sessionId } = await res.json();
        return sessionId;
    });
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
        sessionId,
    });
}