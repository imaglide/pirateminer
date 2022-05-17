import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import useSWR from "swr";
import { ERC20ABI as abi } from "../abi/ERC20ABI";
import { isAddress } from "ethers/lib/utils";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
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
} from "@chakra-ui/react";

interface Props {
  addressContract: string;
}

export default function ApproveContractSpend(props: Props) {
  const addressBUSD = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
  const addressSmartContract = props.addressContract;

  const { account, active, library } = useWeb3React<Web3Provider>();

  const [amount, setApproveAmount] = useState<string>("100");

  //const [allowance,setAllowance]=useState<string>('100')

  async function approveContract(event: React.FormEvent) {
    event.preventDefault();
    console.log("amount", amount);
    console.log("contract address", addressSmartContract);

    if (!(active && account && library)) return;

    // new contract instance with **signer**
    const erc20 = new Contract(addressSmartContract, abi, library.getSigner());

    erc20.approveSpend(parseEther(amount)).catch("error", console.error);
  }

  const handleChange = (value: string) => setApproveAmount(amount);

  return (
    <form onSubmit={approveContract}>
      <FormControl>
        <FormLabel htmlFor="amount">Approve Spend Amount: </FormLabel>
        <NumberInput
          defaultValue={amount}
          min={1}
          max={1000}
          onChange={handleChange}
        >
          <NumberInputField />
        </NumberInput>
        <Button type="submit" isDisabled={!account}>
          Amount to Approve
        </Button>
      </FormControl>
    </form>
  );
}
