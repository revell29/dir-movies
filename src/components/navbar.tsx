/* eslint-disable react/no-children-prop */
import {
  Button,
  Flex,
  Heading,
  useDisclosure,
  useToken,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Search } from 'react-feather';

import { routes } from '@/routes';

import { SearchMovie } from './modal/SearchMovie';

const routeArray = Object.entries(routes as Record<string, string>);

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const isRoute = React.useCallback(
    (route: string) => {
      return router.route == route;
    },
    [router.route]
  );

  const [gray900] = useToken('colors', ['gray.900']) as [string];
  const bgColor = `${gray900}E6`;
  const lighterBgColor = `${gray900}99`;

  return (
    <Flex
      bgColor={bgColor}
      borderBottomColor='whiteAlpha.50'
      borderBottomWidth='2px'
      d={['flex']}
      insetX={0}
      justify='center'
      p={[3, 6]}
      px={[4, 16]}
      pos='sticky'
      sx={{
        '@supports (backdrop-filter: blur(12px))': {
          backdropFilter: 'blur(12px)',
          bgColor: lighterBgColor,
        },
        '@supports (-webkit-backdrop-filter: blur(12px))': {
          WebkitBackdropFilter: 'blur(12px)',
          bgColor: lighterBgColor,
        },
      }}
      top={0}
      zIndex='modal'
    >
      <Link href='/' passHref>
        <Heading as='a' fontSize='25px' mr={8}>
          DirMovies
        </Heading>
      </Link>
      {routeArray.map(([route, name]) => (
        <Link key={name} href={route} passHref>
          <Button
            as='a'
            colorScheme={isRoute(route) ? 'pink' : undefined}
            fontWeight={isRoute(route) ? 'bold' : 'normal'}
            variant='ghost'
          >
            {name}
          </Button>
        </Link>
      ))}
      <Flex ml='auto' w='20%'>
        <Button
          w='full'
          leftIcon={<Search />}
          justifyContent='start'
          color='gray.500'
          onClick={onOpen}
        >
          Cari film
        </Button>
      </Flex>
      <SearchMovie isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
