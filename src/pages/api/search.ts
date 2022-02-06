import type { NextApiRequest, NextApiResponse } from 'next';

import { searchWithKeyword } from '@/services/search';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query } = req.query;
    const result = await searchWithKeyword(query as string);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
