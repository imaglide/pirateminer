import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import useSWR from "swr";
import { ERC20ABI as abi } from "../abi/ERC20ABI";
import { isAddress } from "ethers/lib/utils";
import {
  Container,
  Text,
  Button,
  SimpleGrid,
  Flex,
  Input,
  Divider,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Box,
  Heading
} from "@chakra-ui/react";
import ETHBalance from "./ETHBalance";
import BuyEggs from "./BuyEggs";
import ClaimEggs from "./ClaimEggs"

interface Props {
  addressContract: string;
}
declare let window: any;

const fetcher =
  (library: Web3Provider | undefined, abi: any) =>
  (...args: any) => {
    if (!library) return;

    const [arg1, arg2, ...params] = args;
    console.log("arg1", arg1);
    console.log("arg2", arg2);
    console.log("params", params);

    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library);
    return contract[method](...params);
  };

export default function ReadERC20(props: Props) {

  
  const addressContract = props.addressContract;

  const { account, active, library } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useSWR([addressContract, "getBalance"], {
    fetcher: fetcher(library, abi),
  });

  const { data: availableEarnings } = useSWR(
    ["getAvailableEarnings", addressContract, account],
    {
      fetcher: fetcher(library, abi),
    }
  );


  useEffect(() => {
    if (!(active && account && library)) return;

    const erc20: Contract = new Contract(addressContract, abi, library);

    // listen for changes on an Ethereum address

    library.on("block", () => {
      // update balance, rewards and cheeze every block
      mutate(undefined, true)
    });

    //remove listener when the component is unmounted
    return () => {
      // erc20.removeAllListeners(toMe)
      // erc20.removeAllListeners(fromMe)
    };

    // trigger the effect only on component mount
  }, [active, account]);


  const onClickClaimRewards = async () => {
    console.log("claim");
    // const erc20: Contract = new Contract(addressContract, abi, library);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20: Contract = new ethers.Contract(addressContract, abi, signer);
    const fromMe = erc20.sellEggs();
    erc20.on(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event });
      //  mutate(undefined, true)
    });
  };

  console.log("balance",balance)

  let displayBalance: number = 0;
  let displayAvailableEarnings: number = 0;
  let displayCheese: number = 0;
  let displayMiners: string = "0";
  let displayEggYield:number =0;

  if (balance) displayBalance = balance;
  // if (rewards)
  //       displayRewards = rewards;
  if (availableEarnings) displayAvailableEarnings = availableEarnings;
  //   if (miners)
  //      displayMiners = miners;
  

  return (
    <Container>
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        <Flex height="80px" justifyContent="left">
          <Text fontSize="2xl">Contract Balance</Text>
        </Flex>

        <Flex height="80px" justifyContent="right">
          <Text fontSize="2xl">
            {parseFloat(formatEther(displayBalance)).toFixed(3)} BUSD
          </Text>
        </Flex>
        <Flex height="80px" justifyContent="left">
          <Text fontSize="2xl">Your Cheeze</Text>
        </Flex>
        <Flex height="80px" justifyContent="right">
          <Text fontSize="2xl" justifyContent="right">
            {displayAvailableEarnings} Cheez
          </Text>
        </Flex>
        <Flex height="80px" justifyContent="left">
          <Text fontSize="2xl">Your Yield</Text>
        </Flex>
        <Flex height="80px" justifyContent="right">
          <Text fontSize="2xl" justifyContent="right">
            {displayEggYield} 
          </Text>
        </Flex>
        <Flex height="80px" justifyContent="right">
          <Text fontSize="2xl" justifyContent="right">
            <ClaimEggs addressContract={addressContract} />
          </Text>
        </Flex>
        
      </SimpleGrid>

      <Divider style={{ background: "black" }} variant="middle" />

      <Box  my={4} p={4} w='100%' borderWidth="1px" borderRadius="lg">
           <BuyEggs addressContract={addressContract} />
    </Box>

    </Container>
  );
}
