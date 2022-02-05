import { Button, Flex, Heading, Input, useToken } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { routes } from '@/routes';

const routeArray = Object.entries(routes as Record<string, string>);

export const Navbar: React.FC = () => {
  const router = useRouter();

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
      <Heading as='h2' fontSize='25px' mr={8}>
        DirMovies
      </Heading>
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
      <Flex ml='auto'>
        <Input
          placeholder='Search'
          bg='whiteAlpha.50'
          _focus={{
            border: 0,
            boxShadow: 'none',
          }}
        />
      </Flex>
    </Flex>
  );
};
