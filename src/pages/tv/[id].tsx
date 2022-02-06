import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import { fetcher } from '@/lib/fether';
import { isMobile } from '@/lib/helpers';

import { EpisodeBox } from '@/components/EpisodeBox';
import { MetadataMovie } from '@/components/MetadataMovie';
import { DesktopPlayer } from '@/components/player/Desktop';
import { MobilePlayer } from '@/components/player/Mobile';

import { RootDetail } from '@/types/base';

const DetailTV: NextPage = () => {
  const { query } = useRouter();
  const episodeIndex = Number(query.episode) || 1;
  const { data: detailTv } = useSWR<RootDetail>(
    query.id && `/api/tv?id=${query.id}&episode=${episodeIndex}`,
    fetcher
  );
  const mediaType = typeof episodeIndex === 'undefined' ? 'movie' : 'tv';

  React.useEffect(() => {
    if (!detailTv) return;
    let existing = JSON.parse(
      localStorage.getItem('dirmovie-recent') || '[]'
    ) as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== detailTv?.data.id);
    existing.unshift({
      id: detailTv?.data.id,
      category: detailTv?.data.category,
      coverVerticalUrl: detailTv?.data.coverVerticalUrl,
      name: detailTv?.data.name,
    });

    localStorage.setItem('dirmovie-recent', JSON.stringify(existing));
  }, [detailTv]);

  return (
    <Box>
      {detailTv && detailTv && (
        <Box>
          {isMobile() ? (
            <MobilePlayer
              playerKey={`${mediaType}-${detailTv?.data.id}${
                episodeIndex ? `-${episodeIndex}` : ''
              }`}
              sources={detailTv?.sources}
              subtitles={detailTv?.subtitles}
            />
          ) : (
            <DesktopPlayer
              playerKey={`${mediaType}-${detailTv?.data.id}${
                episodeIndex ? `-${episodeIndex}` : ''
              }`}
              sources={detailTv?.sources}
              subtitles={detailTv?.subtitles}
            />
          )}
          <MetadataMovie detailTv={detailTv} />
          {mediaType === 'tv' && (
            <EpisodeBox detailTv={detailTv} episodeIndex={episodeIndex} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default DetailTV;
