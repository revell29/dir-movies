import type { NextApiRequest, NextApiResponse } from 'next';

import { getTVDetail } from '@/services/tv';

import { RootDetail } from '@/types/base';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, episode } = req.query;
    const result: RootDetail = await getTVDetail(id as string, Number(episode));
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
