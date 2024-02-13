import { getUserCookie } from "@/lib/helpers/UserHelper";
import { BooKingPost } from "@/types/Booking";
import { UserCookieType } from "@/types/User";
import { NextApiRequest, NextApiResponse } from "next";

export async function handleBooking(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getUserCookie(UserCookieType.SESSION);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer {${session.token}}`
        },
        body: JSON.stringify(req.body as BooKingPost)
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}