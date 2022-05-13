

import React from 'react';

import { Container, Stack, HStack, VStack, Box, Circle, Badge, Text, Icon, Button,Heading, Divider } from '@chakra-ui/react'

const Faq = () => {
    return (
        


        <Container bg='#F3E5AB' maxW='2xl'>
            
            <Heading>The Name of the Game is Big Cheeze</Heading>
                <Text className="body">
                    Lets just be honest, just like everyone else we took the eggs smart contract and made some updates and slapped this cheezy UI on top of it. We bet you have invested money into several of these contracts, so why not
                    invest. 
                    <Divider></Divider>
                    <b>WARNING: Big Cheez is a high-risk ROI dapp. As such, only invest what you are willing to lose, as you may lose it all.</b>
                </Text>
        
        </Container>
    )
}

export default Faq;