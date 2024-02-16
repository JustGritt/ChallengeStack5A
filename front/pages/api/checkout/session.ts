import { BooKingPost } from '@/types/Booking';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2023-10-16',
});

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { employee, service, startDate, amount, serviceName, email } = req.body
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    metadata: {
      employee,
      service,
      startDate,
      amount,
    },
    customer_email: email,
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: serviceName
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  })
  res.status(200).json({ sessionId: session.id });
}

export default checkout;