import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: '2023-10-16',
});

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ['payment_intent']});
  res.status(200).json({ session });
}

export default checkout;