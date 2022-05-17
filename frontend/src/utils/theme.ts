import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Work Sans, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem', // 14px
    md: '1rem', // 15px
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem', // 25px
    '3xl': '1.875rem',
    '4xl': '2.25rem', //35px
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  sizes: {
    'container.xl': '1500px',
    'container.dashboard': '1350px',
    'container.form': '550px',
    'container.normal': '1200px',
  },
  components: {
    stepperBox: {
      baseStyle: {
        py: '20px',
        borderRadius: '10px',
        mb: '28px',
        w: '500px',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '25px',
      },
      variants: {
        normal: {
          border: '1px solid #FFFFFF',
          color: '#FFFFFF',
        },
        success: {
          border: '1px solid #4EFF9F',
          color: '#4EFF9F',
        },
        locked: {
          border: '1px solid #407DC1',
          color: '#407DC1',
        },
      },
      defaultProps: {
        variant: 'normal',
      },
    },
  },
});
export default theme;
