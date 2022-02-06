import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { resizeImage } from '@/lib/helpers';

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}

const BannerSlider: React.FC<SliderProps> = ({ images }: SliderProps) => {
  return (
    <Swiper
      style={{
        overflow: 'hidden',
        borderRadius: '10px',
      }}
      modules={[Navigation]}
      navigation
      loop
      slidesPerView={1}
    >
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <Link href={item.link} passHref>
            <Box pos='relative' w='full' h='auto' pb='40%'>
              <LazyLoadImage
                src={resizeImage(item.image, '2000')}
                alt=''
                effect='opacity'
                style={{
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  objectFit: 'cover',
                  left: 0,
                }}
              />
              <Heading
                pos='absolute'
                overflow='hidden'
                bottom={{ base: 6, md: 10 }}
                left={{ base: 6, md: 10 }}
                fontSize={{ base: 'md', md: '3xl' }}
                maxW='86%'
              >
                {item.title}
              </Heading>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
