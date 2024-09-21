// theme.js
import { extendTheme } from '@chakra-ui/react';
import "@fontsource/space-grotesk";

const theme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,  // Font for headings
    body: `'Space Grotesk', sans-serif`,   // Font for body text
  },
 
  // Additional theme customizations can go here
});

export default theme;
