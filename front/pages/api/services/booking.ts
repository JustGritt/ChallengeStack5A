import { getUserCookie } from "@/lib/helpers/UserHelper";
import { BooKingPost } from "@/types/Booking";
import { UserCookieType } from "@/types/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleBooking(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const authToken = req.headers.authorization;
      console.log("🚀 ~ handleBooking ~ authToken:", authToken)
      const response = await fetch(`https://api.odicylens.com/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify(req.body as BooKingPost)
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}