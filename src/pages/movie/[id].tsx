import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import { fetcher } from '@/lib/fether';

import { DesktopPlayer } from '@/components/player/Desktop';

import { RootDetail } from '@/types/base';

const DetailMovie: NextPage = () => {
  const { query } = useRouter();
  const episodeIndex = Number(query.episode) || 0;
  const { data } = useSWR<RootDetail>(
    query.id && `/api/movie?id=${query.id}`,
    fetcher
  );
  const mediaType = typeof episodeIndex === 'undefined' ? 'movie' : 'tv';

  React.useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(
      localStorage.getItem('dirmovie-recent') || '[]'
    ) as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data?.data.id);

    existing.unshift({
      id: data?.data.id,
      category: data?.data.category,
      coverVerticalUrl: data?.data.coverVerticalUrl,
      name: data?.data.name,
    });

    localStorage.setItem('dirmovie-recent', JSON.stringify(existing));
  }, [data]);

  return (
    <Box>
      {data && data && (
        <Box>
          <DesktopPlayer
            playerKey={`${mediaType}-${data?.data.id}${
              episodeIndex ? `-${episodeIndex}` : ''
            }`}
            sources={data?.sources}
            subtitles={data?.subtitles}
          />
        </Box>
      )}
    </Box>
  );
};

export default DetailMovie;
