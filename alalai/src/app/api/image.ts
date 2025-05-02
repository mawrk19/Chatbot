// pages/api/image.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { content } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': '<YOUR_SITE_URL>', // optional
        'X-Title': '<YOUR_SITE_NAME>',     // optional
      },
      body: JSON.stringify({
        model: 'opengvlab/internvl3-14b:free',
        messages: [
          {
            role: 'user',
            content, // should be [{ type: "text", text: "..." }, { type: "image_url", image_url: { url: "..." } }]
          },
        ],
      }),
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
