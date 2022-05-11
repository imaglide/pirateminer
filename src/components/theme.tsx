import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    subHeading: "Times New Roman",
    body: "Arial Black",
    Text: "Roboto"
  },
  textStyles: {
    h2: {
      'font-family': 'var(--chakra-fonts-subHeading)',
    },
  }
});

export default theme;