import { Box, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWRInfinite from 'swr/infinite';

import { fetcher } from '@/lib/fether';
import { resizeImage } from '@/lib/helpers';

import { BannerSlider, SectionSlider } from '@/components/slider';

import { HomeSection } from '@/types/base';

const Home: NextPage = () => {
  const getKey = (index: number) => `home-${index || 0}`;
  const { data, error, setSize } = useSWRInfinite<HomeSection[]>(
    getKey,
    async (key) => {
      const res = await fetcher(
        `/api/home?page=${Number(key.split('-').slice(-1)[0])}`
      );
      return res;
    },
    { revalidateFirstPage: false }
  );

  return (
    <>
      {data && (
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={() => setSize((prev) => prev + 1)}
          hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
          loader={<div>Loading...</div>}
        >
          {data
            .reduce((acc, current) => [...acc, ...current], [])
            .map((section, index) =>
              section.homeSectionType === 'BANNER' ? (
                <Box mt={9} key={index}>
                  <BannerSlider
                    images={
                      section.recommendContentVOList.map((item) => {
                        const searchParams = new URLSearchParams(
                          new URL(item.jumpAddress).search
                        );
                        return {
                          title: item.title,
                          image: item.imageUrl,
                          link:
                            searchParams.get('type') === '0'
                              ? `/movie/${searchParams.get('id')}`
                              : `/tv/${searchParams.get('id')}`,
                        };
                      }) || []
                    }
                  />
                </Box>
              ) : (
                <Box mt={9} key={index}>
                  <Heading fontSize='2xl' mb={5}>
                    {section.homeSectionName.replace('on Loklok', '')}
                  </Heading>
                  <SectionSlider
                    images={section.recommendContentVOList.map((item) => {
                      const searchParams = new URLSearchParams(
                        new URL(item.jumpAddress).search
                      );
                      return {
                        title: item.title,
                        image: resizeImage(item.imageUrl, '200'),
                        link:
                          searchParams.get('type') === '0'
                            ? `/movie/${searchParams.get('id')}`
                            : `/tv/${searchParams.get('id')}`,
                      };
                    })}
                    coverType={section.coverType}
                  />
                </Box>
              )
            )}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
