import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({ status: 'alive', time: new Date().toISOString() });
}
