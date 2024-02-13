import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51OMwURF9MmQfZRp33UMVAUgs2HEXTcvvacO67SkCBNNQP3RxGAIqOF7O9zdJPgtsVV59X7m3g6jf1YRNu0014bpL000rnpvGbn', {
    apiVersion: '2023-10-16',
})

const webhookSecret: string = 'whsec_7118723d38a1a79f2c1310e85616b1aa756c8762e74355c8d846083a4c610469'

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
            console.log('PaymentIntent was successful!')
        } else if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            console.log('PaymentIntent was not successful!')
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object as Stripe.Charge
            console.log('Charge was successful!')
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