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
        </div>
    </div>
</div>
  )
}
