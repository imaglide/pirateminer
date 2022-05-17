import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";
import { parseEther }from "@ethersproject/units"
import { Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel,Heading } from '@chakra-ui/react'
import { ERC20ABI as abi } from "../abi/ERC20ABI";

interface Props {
    addressContract: string
    amountOfEggs: number
}

export default function ClaimEggs(props:Props){
  const addressContract = props.addressContract
  const eggs = props.amountOfEggs
  const [toAddress, setToAddress]=useState<string>("")
  const [amount,setAmount]=useState<string>('100')

  const { account, active, library} = useWeb3React<Web3Provider>()

  async function sellEggs(event:React.FormEvent) {
    event.preventDefault()
    if(!(active && account && library)) return

    // new contract instance with **signer**
    const erc20 = new Contract(addressContract,abi, library.getSigner());
     
    
    
    erc20.sellEggs().catch('error', console.error)
  }

  const handleChange = (value:string) => setAmount(value)

  return (
    <div>
    {active && eggs>0 ? (
              <form onSubmit={sellEggs}>
              <FormControl>
              <FormLabel htmlFor='amount'>Amount: </FormLabel>
                <NumberInput defaultValue={amount} min={1} max={1000} onChange={handleChange}>
                  <NumberInputField />
                </NumberInput>
                <Button type="submit" isDisabled={!account}>Amount to Approve</Button>
              </FormControl>
            </form>
    ) : (
      <div>
           <FormControl>
              <div></div>
            </FormControl>
      </div>
    )}
  </div>
  )
}