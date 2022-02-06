import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '../styles/globals.css';

import MainLayout from '@/components/layouts/MainLayout';

import theme from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </MainLayout>
    </ChakraProvider>
  );
}

export default MyApp;
