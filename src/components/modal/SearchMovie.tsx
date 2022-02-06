/* eslint-disable react/no-children-prop */
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';
import { Search } from 'react-feather';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useSWR from 'swr';

import { fetcher } from '@/lib/fether';
import { debounce, resizeImage } from '@/lib/helpers';

import { SearchResultItem } from '@/types/base';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchMovie: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = React.useState('');
  const { data: resultSearch } = useSWR<SearchResultItem[]>(
    query !== '' && `${`/api/search?query=${query}`}`,
    fetcher
  );

  const handleSearch = debounce((e) => setQuery(e.target.value), 500);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setQuery('');
      }}
      size='2xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <InputGroup p={3}>
            <InputLeftElement
              pointerEvents='none'
              mt={1}
              children={<Search />}
            />
            <Input
              placeholder='Search movie'
              border='0px'
              variant='unstyled'
              onChange={(e) => handleSearch(e)}
            />
          </InputGroup>
          {resultSearch && resultSearch.length === 0 && (
            <Box
              minH='200px'
              d='flex'
              alignItems='center'
              justifyContent='center'
              w='full'
            >
              <Text>No result found</Text>
            </Box>
          )}
          <SimpleGrid columns={[2, 3, 4, 4]} gap={5} py={10}>
            {resultSearch &&
              resultSearch.length > 0 &&
              resultSearch.map((item, index) => (
                <Link
                  key={index}
                  href={
                    item.domainType === 0
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
                  }
                  passHref
                >
                  <Box
                    _hover={{
                      cursor: 'pointer',
                      color: 'pink.500',
                    }}
                  >
                    <LazyLoadImage
                      alt=''
                      effect='blur'
                      src={resizeImage(item.coverVerticalUrl, '150')}
                    />
                    <Stack>
                      <Text isTruncated fontSize='14px'>
                        {item.name}
                      </Text>
                    </Stack>
                  </Box>
                </Link>
              ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
