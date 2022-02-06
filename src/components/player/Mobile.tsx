import { Box, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import * as React from 'react';

import { subtitleProxy } from '@/lib/helpers';
const HlsPlayer = dynamic(() => import('react-hls-player'), { ssr: false });

interface PlayerProps {
  playerKey: string;
  sources: {
    quality: number;
    url: string;
  }[];
  subtitles: {
    lang: string;
    language: string;
    url: string;
  }[];
}

export const MobilePlayer: React.FC<PlayerProps> = ({
  playerKey,
  sources,
  subtitles,
}: PlayerProps) => {
  const playerRef = React.useRef<HTMLVideoElement>(null);
  const [loadedData, setLoadedData] = React.useState(false);

  return (
    <Box pos='relative' w='full'>
      <Flex
        top={0}
        left={0}
        w='full'
        h='full'
        justifyContent='center'
        alignItems='center'
        bg='rgba(0,0,0,0.5)'
        role='group'
        _hover={{
          cursor: 'pointer',
        }}
      >
        <HlsPlayer
          crossOrigin=''
          playsInline
          controls
          autoPlay={false}
          playerRef={playerRef}
          src={sources[0].url}
          className='w-full h-full'
          onLoadedData={() => {
            setLoadedData(true);
            const currentTime = Number(
              localStorage.getItem(`${playerKey}-time`) as string
            );
            playerRef.current && (playerRef.current.currentTime = currentTime);
          }}
          onTimeUpdate={() => {
            localStorage.setItem(
              `${playerKey}-time`,
              String(playerRef.current?.currentTime || 0)
            );
          }}
        >
          {loadedData &&
            subtitles.map((subtitle, index) => (
              <track
                key={index}
                kind='subtitles'
                srcLang={subtitle.lang}
                label={subtitle.language}
                src={subtitleProxy(subtitle.url)}
                default={index === 0}
              />
            ))}
        </HlsPlayer>
      </Flex>
    </Box>
  );
};
