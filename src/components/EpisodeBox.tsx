import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';

import { RootDetail } from '@/types/base';

interface Props {
  detailTv: RootDetail;
  episodeIndex: number;
}

export const EpisodeBox: React.FC<Props> = ({
  detailTv,
  episodeIndex,
}: Props) => {
  return (
    <Box overflow='auto'>
      <Flex as='p' mt={8} gap={3}>
        {detailTv.data.episodeVo.map((eps, index) => (
          <Link
            href={`/tv/${detailTv.data.id}?episode=${eps.seriesNo}`}
            passHref
            key={index}
          >
            <Box
              bg={eps.seriesNo === episodeIndex ? 'pink.500' : 'gray.700'}
              px={5}
              py={3}
              rounded='4px'
              _hover={{
                cursor: 'pointer',
                bg: 'gray.800',
              }}
            >
              <Text>{eps.seriesNo}</Text>
            </Box>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
