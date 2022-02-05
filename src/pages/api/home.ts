// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import serviceHome from '@/services/home';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await serviceHome.getHome(Number(req.query.page));
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
