import {
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { Pause, Play, Volume1, Volume2, VolumeX } from 'react-feather';

import { formatVideoTime } from '@/lib/helpers';

import { Caption } from '../icons/Caption';

interface ControlBarProps {
  refPauseButton: React.RefObject<HTMLButtonElement>;
  setPause: () => void;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onChangeVolume: () => void;
  hoverEnabled: boolean;
  subtitles: {
    lang: string;
    language: string;
    url: string;
  }[];
  setSubtitle: (index: number) => void;
  subTitleIndex: number;
  quality: number;
  sourceQuality: {
    quality: number;
    url: string;
  }[];
  setQuality: (index: number) => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  refPauseButton,
  setPause,
  isPaused,
  currentTime,
  duration,
  volume,
  onChangeVolume,
  hoverEnabled,
  subtitles,
  setSubtitle,
  subTitleIndex,
  quality,
  sourceQuality,
  setQuality,
}) => {
  return (
    <Flex
      alignItems='center'
      py={2}
      px={4}
      gap={4}
      opacity={isPaused ? 1 : 0}
      _groupHover={{
        opacity: hoverEnabled ? 1 : 0,
      }}
    >
      <Button
        size='sm'
        variant='unstyled'
        ref={refPauseButton}
        onClickCapture={() => setPause()}
      >
        {isPaused ? <Play /> : <Pause />}
      </Button>
      <Button size='sm' variant='unstyled' onClickCapture={onChangeVolume}>
        {volume === 100 ? (
          <Volume2 />
        ) : volume === 0 ? (
          <VolumeX />
        ) : (
          <Volume1 />
        )}
      </Button>
      <HStack>
        <Text>{formatVideoTime(currentTime)}</Text>
        <Text>/</Text>
        <Text>{formatVideoTime(duration)}</Text>
      </HStack>
      <Popover trigger='hover' placement='top'>
        <PopoverTrigger>
          <Button ml='auto' variant='unstyled' size='sm'>
            <Caption h='24px' w='24px' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w='auto'
          bg='black'
          border='1px'
          borderColor='whiteAlpha.50'
        >
          <PopoverArrow />

          <PopoverBody>
            <Stack>
              {subtitles.map((subtitle, index) => (
                <Text
                  key={index}
                  onClickCapture={() => setSubtitle(index)}
                  color={subTitleIndex === index ? 'pink.500' : undefined}
                  _hover={{
                    cursor: 'pointer',
                    color: 'pink.500',
                  }}
                >
                  {subtitle.language}
                </Text>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover trigger='hover' placement='top'>
        <PopoverTrigger>
          <Button variant='unstyled' size='sm'>
            {sourceQuality.find((source, index) => index === quality)?.quality}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w='auto'
          bg='black'
          border='1px'
          borderColor='whiteAlpha.50'
        >
          <PopoverArrow />

          <PopoverBody>
            <Stack>
              {sourceQuality.map((source, index) => (
                <Text
                  key={index}
                  onClickCapture={() => {
                    setQuality(index);
                    setPause();
                  }}
                  color={quality === index ? 'pink.500' : undefined}
                  _hover={{
                    cursor: 'pointer',
                    color: 'pink.500',
                  }}
                >
                  {source.quality}p
                </Text>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
