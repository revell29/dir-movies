import { Box, Heading, LinkBox, SimpleGrid, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import { IMAGE_CARD_SIZE } from '@/lib/helpers';

interface HistoryProps {
  category: number;
  coverVerticalUrl: string;
  id: string;
  name: string;
}

const getHistory = (): HistoryProps[] => {
  try {
    const existing = JSON.parse(
      localStorage.getItem('dirmovie-recent') || '[]'
    );
    return existing;
  } catch {
    return [];
  }
};

const HistoryPage: NextPage = () => {
  const [data, setData] = React.useState<HistoryProps[]>([]);

  React.useEffect(() => {
    const existing = getHistory();
    setData(existing);
  }, []);

  return (
    <Box>
      <Heading mb={8}>History</Heading>
      <SimpleGrid columns={[2, 3, 4, 7]} gap={5}>
        {data.map((item, index) => (
          <Link
            href={item.category === 0 ? `/movie/${item.id}` : `/tv/${item.id}`}
            passHref
            key={index}
          >
            <LinkBox
              pos='relative'
              w='full'
              mb={3}
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
                  width: IMAGE_CARD_SIZE[1].width,
                  height: IMAGE_CARD_SIZE[1].height,
                  objectFit: 'cover',
                }}
                width={IMAGE_CARD_SIZE[1].width}
                height={IMAGE_CARD_SIZE[1].height}
                src={item.coverVerticalUrl}
              />
              <Text overflow='hidden' fontSize='sm' isTruncated>
                {item.name}
              </Text>
            </LinkBox>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HistoryPage;
