'use client';

import { ChakraProvider } from '@chakra-ui/react';
import store from '@redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import theme from '../theme/index';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ChakraProvider>
  );
}
