import { Container, EASINGS, Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import MotionBox from '../motion/box';
import { Navbar } from '../navbar';

const PAGE_TRANSITION_VARIANTS = {
  initial: { opacity: 0, x: 0, y: -8 },
  enter: { duration: 0.2, ease: EASINGS.easeOut, opacity: 1, x: 0, y: 0 },
  exit: { duration: 0.1, ease: EASINGS.easeIn, opacity: 0, x: 0, y: 8 },
};

const MainLayout: React.FC = (props) => {
  const { children } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
      </Head>

      <Flex flexDir='column' minH='100vh'>
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <MotionBox
            key={router.route}
            animate='enter'
            exit='exit'
            flexGrow={1}
            initial='initial'
            variants={PAGE_TRANSITION_VARIANTS}
          >
            <Container maxW='container.xl' py={5} px={5}>
              {children}
            </Container>
          </MotionBox>
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default MainLayout;
