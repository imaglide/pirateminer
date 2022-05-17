import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";
import { parseEther }from "@ethersproject/units"
import { Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import { ERC20ABI as abi } from "../abi/ERC20ABI";

interface Props {
    addressContract: string
}

export default function BuyEggs(props:Props){
  const addressContract = props.addressContract
  const [toAddress, setToAddress]=useState<string>("")
  const [amount,setAmount]=useState<string>('100')

  const { account, active, library} = useWeb3React<Web3Provider>()

  async function transfer(event:React.FormEvent) {
    event.preventDefault()
    if(!(active && account && library)) return

    // new contract instance with **signer**
    const erc20 = new Contract(addressContract,abi, library.getSigner());
    
    console.log("Contract Address", addressContract)
    
    console.log("Amount",amount)
    console.log("Account",account)
    console.log("parsed Amount",(parseEther(amount)).toString())
  
    
    erc20.buyEggs(account,parseEther(amount)).catch('error', console.error)
  }

  const handleChange = (value:string) => setAmount(value)

  return (
    <div>
        <form onSubmit={transfer}>
          <FormControl>
          <FormLabel htmlFor='amount'>Amount: </FormLabel>
            <NumberInput defaultValue={amount} min={1} max={1000} onChange={handleChange}>
              <NumberInputField />
            </NumberInput>
            <Button type="submit" isDisabled={!account}>Buy</Button>
          </FormControl>
        </form>
    </div>
  )
}