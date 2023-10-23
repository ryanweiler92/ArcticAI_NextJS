import { extendTheme } from '@chakra-ui/react';

import * as components from './components';
import { config } from './config';
import foundations from './foundations';
import { styles } from './styles';

const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1220px',
};

export const theme = extendTheme({
  config,
  styles,
  breakpoints,
  ...foundations,
  components: { ...components },
});
