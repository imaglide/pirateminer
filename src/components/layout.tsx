// src/components/layout.tsx
import React, { ReactNode } from 'react'
import { Text, Center, Container, useColorModeValue, Box } from '@chakra-ui/react'
import Header from './header'

import Background from '../../src/images/BCBackground.png'

type Props = {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <div>
      <Header />
      <Box 
        backgroundImage="url(/img/BCBackground.png)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
      
      <Container maxW="container.md" py='8'>
        {props.children}
      </Container>
        </Box>
        <div className="footer wf-section">
        <div className="div-block-1200 center">
            <p className="body white center">© BIG CHEEZE. All Rights Reserved.</p>
            <div className="sm_box">
                <a href="#" target="_blank" className="social-media-link w-inline-block">
                    <img src="https://assets.website-files.com/6267045bbcf1451f09d3ed15/6267166aee241f4063b389d2_Recurso%2013.svg" width="89" alt="" className="socialmedia_icon" />
                </a>
                <a href="#" target="_blank" className="social-media-link w-inline-block">
                    <img src="https://assets.website-files.com/6267045bbcf1451f09d3ed15/6267166aee241f149eb389d4_Recurso%2012.svg" width="89" alt="" className="socialmedia_icon" />
                </a>
                <a href="#" target="_blank" className="social-media-link w-inline-block">
                    <img src="https://assets.website-files.com/6267045bbcf1451f09d3ed15/6267166aee241f0bb9b389d3_Recurso%2018.svg" width="89" alt="" className="socialmedia_icon" />
                </a>
            </div>
        </div>
    </div>
</div>
  )
}
