// src/pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { StyledEngineProvider } from '@mui/material/styles';
import theme from '../components/theme'

import styled from "@emotion/styled";
import "@fontsource/ribeye"

const AppContainer = styled.div`
font-family: "Ribeye", cursive;
`;


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  
  return library
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <AppContainer>
        <Layout>
        <Component {...pageProps} />
        </Layout>
        </AppContainer>
      </ChakraProvider>
    </Web3ReactProvider>
    </StyledEngineProvider>
    
  )
}

export default MyApp