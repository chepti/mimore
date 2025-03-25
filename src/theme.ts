import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  direction: 'rtl',
  fonts: {
    heading: 'Assistant, sans-serif',
    body: 'Assistant, sans-serif',
  },
  styles: {
    global: {
      body: {
        direction: 'rtl',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'md',
      },
    },
  },
});

export default theme; 