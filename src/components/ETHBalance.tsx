import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import useSWR from "swr";
import { BUSDABI as abi } from "../abi/BUSDABI";
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
} from "@chakra-ui/react";

const fetcher =
  (library: Web3Provider | undefined, abi: any) =>
  (...args: any) => {
    if (!library) return;

    const [arg1, arg2, ...params] = args;
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library);
    return contract[method](...params);
  };

export default function ETHBalance() {
  const addressContract = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";

  const { account, active, library } = useWeb3React<Web3Provider>();

  const { data: balance } = useSWR([addressContract, "balanceOf", account], {
    fetcher: fetcher(library, abi),
  });

  const { data: symbol } = useSWR([addressContract, "symbol"], {
    fetcher: fetcher(library, abi),
  });

  useEffect(() => {
    if (!(active && account && library)) return;

    const erc20: Contract = new Contract(addressContract, abi, library);

    // listen for changes on an Ethereum address

    //remove listener when the component is unmounted
    return () => {
      // erc20.removeAllListeners(toMe)
      // erc20.removeAllListeners(fromMe)
    };

    // trigger the effect only on component mount
  }, [active, account]);

  let displayBalance: number = 0;

  if (balance) displayBalance = balance;

  return (
    <div>
      {active && balance ? (
        <Text fontSize="md" w="100%" my="2" align="left">
          {parseFloat(formatEther(displayBalance)).toFixed(3)} {symbol}
        </Text>
      ) : (
        <Text fontSize="md" w="100%" my="2" align="left">
          
        </Text>
      )}
    </div>
  );
}
