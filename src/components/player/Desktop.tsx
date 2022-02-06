import { Box, Flex, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { Play } from 'react-feather';

import { subtitleProxy, toggleFullScreen } from '@/lib/helpers';

import { ControlBar } from './ControlBar';
import { SliderBar } from './SliderBar';

// react-video-js-player import
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

export const DesktopPlayer: React.FC<PlayerProps> = ({
  playerKey,
  sources,
  subtitles,
}) => {
  const [quality, setQuality] = React.useState(0);
  const [playbackSpeed, _setPlaybackSpeed] = React.useState(
    Number(localStorage.getItem('dirmovie-speed')) || 1
  );
  const [paused, setPaused] = React.useState(true);
  const [onFullScreen, setOnFullScreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [settingsActive, setSettingsActive] = React.useState(false);
  const [subtitleIndex, setSubtitleIndex] = React.useState(0);

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [loadedData, setLoadedData] = React.useState(false);

  const [volume, setVolume] = React.useState(
    isNaN(parseInt(localStorage.getItem('dirmovie-volume') as string))
      ? 100
      : Number(localStorage.getItem('dirmovie-volume'))
  );

  const [hoverEnabled, setHoverEnabled] = React.useState(true);

  const playerRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const seekRef = React.useRef<HTMLDivElement>(null);
  const mouseDownRef = React.useRef<boolean>(false);
  const timeoutRef = React.useRef<any>(null);
  const fullscreenToggleButton = React.useRef<HTMLButtonElement>(null);
  const pauseButton = React.useRef<HTMLButtonElement>(null);

  const seekTime = (amount: number) => {
    playerRef.current && (playerRef.current.currentTime += amount);
  };

  const toggleSound = () => {
    setVolume((prev) => (prev === 0 ? 100 : 0));
  };

  const handleSeeking = (e: any) => {
    if (!playerRef.current || !seekRef.current) return;

    const offset =
      (e.clientX - (e.target as any).getBoundingClientRect().left) /
      seekRef.current.offsetWidth;

    const newTime =
      (Math.abs(offset) === Infinity || isNaN(offset) ? 0 : offset) *
      playerRef.current.duration;

    playerRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleScreenClicked = (e: any) => {
    if (settingsActive) {
      setSettingsActive(false);
    } else {
      setPaused((prev) => !prev);
    }

    if (e.detail === 2) {
      setOnFullScreen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    paused ? playerRef.current?.pause() : playerRef.current?.play();
  }, [paused]);

  React.useEffect(() => {
    playerRef.current && (playerRef.current.volume = volume / 100);

    localStorage.setItem('dirmovie-volume', String(volume));
  }, [volume]);

  React.useEffect(() => {
    // const elem = containerRef.current as any;
    if (onFullScreen) toggleFullScreen();
  }, [onFullScreen]);

  React.useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.currentTime = currentTime;
    playerRef.current.play();
    setPaused((prev) => !prev);
  }, [quality]);

  React.useEffect(() => {
    if (!playerRef.current) return;

    localStorage.setItem('dirmovie-speed', String(playbackSpeed));

    playerRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const keyHandler = (e: KeyboardEvent) => {
        if (containerRef.current?.contains(window.document.activeElement))
          (window.document.activeElement as any)?.blur();
        // Pause
        if (e.keyCode === 32) pauseButton.current?.click();
        // Rewind
        if (e.keyCode === 37) seekTime(-10);
        // Forward
        if (e.keyCode === 39) seekTime(10);
        // Full screen
        if (e.keyCode === 70) fullscreenToggleButton.current?.click();
      };

      const spacePressHandler = (e: KeyboardEvent) => {
        if (e.keyCode === 32) e.preventDefault();
      };

      window.addEventListener('keyup', keyHandler);

      window.addEventListener('keydown', spacePressHandler);

      return () => {
        window.removeEventListener('keyup', keyHandler);
        window.removeEventListener('keydown', spacePressHandler);
      };
    }
  }, []);

  return (
    <Box pos='relative' w='full'>
      <Flex
        onMouseMove={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          setHoverEnabled(true);

          timeoutRef.current = setTimeout(() => {
            setHoverEnabled(false);
            setSettingsActive(false);
          }, 2000);
        }}
        onMouseLeave={() => setSettingsActive(false)}
        ref={containerRef}
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
          onClickCapture={handleScreenClicked}
          className='w-full h-full cursor-pointer'
          controls={false}
          autoPlay={false}
          playerRef={playerRef}
          src={sources[quality].url}
          onWaiting={() => setLoading(true)}
          onPlaying={() => setLoading(false)}
          onLoadedData={() => {
            setLoadedData(true);
            setDuration(playerRef.current?.duration || 0);
            const currentTime = Number(
              localStorage.getItem(`${playerKey}-time`) as string
            );
            setCurrentTime(currentTime);
            playerRef.current && (playerRef.current.currentTime = currentTime);
          }}
          onTimeUpdate={() => {
            localStorage.setItem(
              `${playerKey}-time`,
              String(playerRef.current?.currentTime)
            );
            setCurrentTime(playerRef.current?.currentTime || 0);
            setDuration(playerRef.current?.duration || 0);
          }}
        >
          {subtitleIndex >= 0 && loadedData && (
            <track
              kind='subtitles'
              srcLang='sub'
              label='Subtitle'
              src={subtitleProxy(subtitles[subtitleIndex]?.url)}
              default
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
              }}
            />
          )}
        </HlsPlayer>

        {loading && !paused && (
          <Box
            pos='absolute'
            top={2}
            d='flex'
            alignItems='center'
            h='full'
            justifyContent='center'
          >
            <Spinner />
          </Box>
        )}

        {paused && (
          <Box
            pos='absolute'
            top={2}
            d='flex'
            alignItems='center'
            h='full'
            w='full'
            justifyContent='center'
            _hover={{
              cursor: 'pointer',
            }}
            onClickCapture={handleScreenClicked}
          >
            <Play size='32px' />
          </Box>
        )}

        <Flex
          pos='absolute'
          bottom={12}
          left={0}
          w='full'
          h='10px'
          flexDir='column'
        >
          <SliderBar
            value={0}
            seekRef={seekRef}
            mouseDownRef={mouseDownRef}
            paused={paused}
            handleSeeking={handleSeeking}
            hoverEnabled={hoverEnabled}
            duration={duration}
            currentTime={currentTime}
          />
          <ControlBar
            refPauseButton={pauseButton}
            setPause={() => setPaused((prev) => !prev)}
            isPaused={paused}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onChangeVolume={toggleSound}
            hoverEnabled={hoverEnabled}
            subtitles={subtitles}
            setSubtitle={(index: number) => setSubtitleIndex(index)}
            subTitleIndex={subtitleIndex}
            quality={quality}
            sourceQuality={sources}
            setQuality={(index) => setQuality(index)}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
