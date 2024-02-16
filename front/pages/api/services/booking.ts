import { NextApiRequest, NextApiResponse } from "next";

export default async function handleBooking(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const authToken = req.headers.authorization;

      const response = await fetch(`https://api.odicylens.com/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`// Ensure the token is correctly formatted
        },
        body: JSON.stringify(req.body)
      });

      // Directly parsing the JSON response
      const data = await response.json();

      if (!response.ok) {
        // Log the structured error response for debugging
        console.error("Error from external API:", data);

        // Return the structured error response to the client
        return res.status(data.status || response.status).json(data);
      }

      // If response is ok, proceed to send back the successful data
      return res.status(200).json(data);
    } catch (error) {
      console.error("Server-side error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
