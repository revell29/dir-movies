import { Box } from '@chakra-ui/react';
import * as React from 'react';

interface SliderBarProps {
  value: number;
  seekRef: any;
  mouseDownRef: any;
  paused: boolean;
  handleSeeking: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hoverEnabled: boolean;
  duration: number;
  currentTime: number;
}

export const SliderBar: React.FC<SliderBarProps> = ({
  seekRef,
  mouseDownRef,
  handleSeeking,
  paused,
  hoverEnabled,
  duration,
  currentTime,
}) => {
  return (
    <Box
      ref={seekRef}
      onMouseDown={(e) => {
        mouseDownRef.current = true;
        handleSeeking(e);
      }}
      onMouseMove={(e) => {
        if (mouseDownRef.current) {
          handleSeeking(e);
        }
      }}
      onMouseUp={() => (mouseDownRef.current = false)}
      onMouseLeave={() => (mouseDownRef.current = false)}
      d='flex'
      flexDir='column'
      alignItems='stretch'
      justifyContent='center'
      h='12px'
      flexShrink={0}
      role='group'
      transform='auto-gpu'
      transitionDuration='fast'
      transitionProperty='common'
      transitionTimingFunction='ease-out'
      _hover={{
        cursor: 'pointer',
      }}
    >
      <Box
        h='4px'
        bg='#FFFFFF80'
        opacity={paused ? 1 : 0}
        _groupHover={{
          opacity: hoverEnabled ? 1 : 0,
        }}
      >
        <Box
          style={{
            width:
              duration !== 0
                ? `${Math.round((currentTime / duration) * 1000) / 10}%`
                : 0,
          }}
          h='full'
          pos='relative'
          bg='pink.500'
          inset={0}
          _groupHover={{
            opacity: 1,
            '::after': {
              opacity: 1,
            },
          }}
          transitionDuration='normal'
          transitionProperty='common'
          transitionTimingFunction='ease-out'
          _after={{
            content: `""`,
            pos: 'absolute',
            w: '12px',
            h: '12px',
            right: '-6px',
            bg: 'white',
            opacity: 0,
            top: '-3.4px',
            borderRadius: 'full',
            appearance: 'none',
          }}
        ></Box>
      </Box>
    </Box>
  );
};
