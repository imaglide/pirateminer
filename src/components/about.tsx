import React, { useEffect } from "react";
import {
  Container,
  Stack,
  HStack,
  VStack,
  Box,
  Circle,
  Badge,
  Text,
  Icon,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";

import { GiCheeseWedge } from "react-icons/gi";
import { FaTelegram, FaTwitter } from "react-icons/fa";

export default function About() {
  return (
    <Box borderRadius="1px" bg="#FCB344" boxShadow="2x2" borderWidth="1px">
      <Center>
        <Heading>
          <div>Make Cheez</div>
        </Heading>
      </Center>

      <Container maxW="2xl" centerContent>
        <HStack>
          <Stack spacing={5}>
            <HStack>
              <Text color="#FEDD7D" fontSize="50px">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">8% Daily ~ 2920% APR</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">8% Referral Bonus</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">4% Hire Bonus</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">12 Hours Compound Timer</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">4 Hours Withdraw Cooldown</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">48 Hours Rewards Accumulation Cut-Off</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">48 Hours Rewards Accumulation Cut-Off</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">10 Times Mandatory Compound Feature</Text>
            </HStack>
            <HStack>
              <Text color="#FEDD7D" fontSize="5xl">
                <Icon as={GiCheeseWedge} />
              </Text>
              <Text fontSize="20px">
                80% Feedback Tax For Early Withdrawals.
              </Text>
            </HStack>
          </Stack>
          <img
            src="https://assets.website-files.com/6267045bbcf1451f09d3ed15/62670ba7a84a0d9ffaf983cc_Big-Cheeze-Mouse.png"
            loading="lazy"
            width="249"
            alt=""
          />
        </HStack>
      </Container>

      <Container centerContent>
        <HStack>
          <Button
            colorScheme="telegram"
            leftIcon={<FaTelegram />}
            size="lg"
          ></Button>
          <Button
            colorScheme="twitter"
            leftIcon={<FaTwitter />}
            size="lg"
          ></Button>
        </HStack>
      </Container>
    </Box>
  );
}
