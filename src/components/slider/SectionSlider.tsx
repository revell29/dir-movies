import { LinkBox, Text } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { IMAGE_CARD_SIZE } from '@/lib/helpers';

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
  coverType: number;
}

const SectionSlider: React.FC<SliderProps> = ({
  images,
  coverType,
}: SliderProps) => {
  return (
    <Swiper
      style={{
        overflow: 'hidden',
      }}
      modules={[Navigation]}
      navigation
      slidesPerView='auto'
      slidesPerGroupAuto
      spaceBetween={30}
    >
      {images.map((item) => (
        <SwiperSlide
          key={item.image}
          style={{ width: IMAGE_CARD_SIZE[(coverType as number) || 1].width }}
        >
          <Link href={item.link} passHref>
            <LinkBox
              pos='relative'
              w='full'
              _hover={{
                cursor: 'pointer',
                color: 'pink.400',
              }}
              overflow='hidden'
              role='group'
              transform='auto-gpu'
              transitionDuration='fast'
              transitionProperty='common'
              transitionTimingFunction='ease-out'
              boxShadow='sm'
              rounded='5px'
              d='inline-block'
            >
              <LazyLoadImage
                alt=''
                effect='blur'
                delayTime={500}
                style={{
                  position: 'absolute',
                  width: IMAGE_CARD_SIZE[coverType || 1].width,
                  height: IMAGE_CARD_SIZE[coverType || 1].height,
                  objectFit: 'cover',
                }}
                width={IMAGE_CARD_SIZE[coverType || 1].width}
                height={IMAGE_CARD_SIZE[coverType || 1].height}
                src={item.image}
              />
              <Text overflow='hidden' fontSize='sm' isTruncated>
                {item.title}
              </Text>
            </LinkBox>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SectionSlider;
