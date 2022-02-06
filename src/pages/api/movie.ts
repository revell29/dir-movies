import type { NextApiRequest, NextApiResponse } from 'next';

import { getMovieDetail } from '@/services/movies';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const result = await getMovieDetail(id as string);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
