import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2023-10-16',
})

const webhookSecret: string = `${process.env.STRIPE_WEBHOOK_SECRET}`;

export const config = {
    api: {
        bodyParser: false,
    }
}

const cors = Cors({
    allowMethods: ['POST', 'HEAD']
})

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']!

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).send(`Webhook Error: ${err.message}`);
            } else {
                res.status(400).send('Webhook Error: An unknown error occurred');
            }
            return
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
        } else if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object as Stripe.Charge
        } else {
            console.warn(`Unhandled event type: ${event.type}`)
        }

        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}

export default cors(webhookHandler as any)