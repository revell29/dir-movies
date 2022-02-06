import { Flex, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';

import Box from './motion/box';

import { RootDetail } from '@/types/base';

interface Props {
  detailTv: RootDetail;
}

export const MetadataMovie: React.FC<Props> = ({ detailTv }: Props) => {
  return (
    <>
      <Heading as='h1' mt={7} fontSize='2xl'>
        {detailTv.data.name}
      </Heading>
      <Flex gap={2} mt={2}>
        <Text>{detailTv.data.score.toFixed(1)}</Text>
        <Text>·</Text>
        {detailTv.data.areaNameList.map((area, index) => (
          <Text key={index}>{area}</Text>
        ))}
        <Text>·</Text>
        <Text>{detailTv.data.year}</Text>
      </Flex>
      <Flex mt={4} gap={4} flexWrap='wrap'>
        {detailTv.data.tagNameList.map((genre, index) => (
          <Box bg='gray.700' rounded='4px' px={4} py={1} key={index}>
            {genre}
          </Box>
        ))}
      </Flex>
      <Text as='p' mt={8}>
        {detailTv.data.introduction}
      </Text>
    </>
  );
};
