import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OMwURF9MmQfZRp33UMVAUgs2HEXTcvvacO67SkCBNNQP3RxGAIqOF7O9zdJPgtsVV59X7m3g6jf1YRNu0014bpL000rnpvGbn', {
  apiVersion: '2023-10-16',
});

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ['payment_intent']});
  res.status(200).json({ session });
}

export default checkout;