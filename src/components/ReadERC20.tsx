import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units"
import { ethers } from 'ethers'
import useSWR from 'swr'
import { ERC20ABI as abi } from "../abi/ERC20ABI"
import { isAddress } from 'ethers/lib/utils';
import { Container,  Text, Button, SimpleGrid, Flex, Input, Divider, Grid, GridItem } from '@chakra-ui/react'


interface Props {
    addressContract: string
}
declare let window: any;

const fetcher = (library: Web3Provider | undefined, abi: any) => (...args:any) => {
    if (!library) return

    const [arg1, arg2, ...params] = args
    const address = arg1
    const method = arg2
    const contract = new Contract(address, abi, library)
    return contract[method](...params)
  }


export default function ReadERC20(props: Props) {
    const addressContract = props.addressContract
    const [symbol, setSymbol] = useState<string>("")
    const [miners, setMiners] = useState<string>()


    const { account, active, library } = useWeb3React<Web3Provider>()

    const { data: balance } = useSWR([addressContract, "getBalance"], {
        fetcher: fetcher(library, abi),
    })

    const { data: rewards } = useSWR([addressContract, "getAvailableEarnings", account], {
        fetcher: fetcher(library, abi)
    })

    const { data: cheese, mutate } = useSWR([addressContract, "getEggsSinceLastHatch", account], {
        fetcher: fetcher(library, abi)
    })



    useEffect(() => {
        if (!(active && account && library)) return

        const erc20: Contract = new Contract(addressContract, abi, library)

        // listen for changes on an Ethereum address

        library.on('block', () => {
            // update balance, rewards and cheeze every block
            mutate(undefined, true)
        })


        //remove listener when the component is unmounted
        return () => {
            // erc20.removeAllListeners(toMe)
            // erc20.removeAllListeners(fromMe)
        }

        // trigger the effect only on component mount
    }, [active, account])


    const onClickBuyMice = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const erc20: Contract = new ethers.Contract(addressContract, abi, signer)
        const fromMe = erc20.buyEggs(account,{value:BigInt(300000000000000000)});
        erc20.on(fromMe, (from, to, amount, event) => {
            console.log('Transfer|sent', { from, to, amount, event })
            mutate(undefined, true)
        })

    }

    const onClickClaimRewards = async () => {
        console.log('claim')
        // const erc20: Contract = new Contract(addressContract, abi, library);
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const erc20: Contract = new ethers.Contract(addressContract, abi, signer)
        const fromMe = erc20.sellEggs();
        erc20.on(fromMe, (from, to, amount, event) => {
            console.log('Transfer|sent', { from, to, amount, event })
            mutate(undefined, true)
        })

    }


    let displayBalance: number = 0
    let displayRewards: number = 0
    let displayCheese: number = 0
    let displayMiners: string = "0";

    if (balance)
          displayBalance = balance;
    if (rewards)
        displayRewards = rewards;
    if (cheese)
        displayCheese = cheese;
    if (miners)
        displayMiners = miners;



    return (
    

<Container>
<SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
  <Flex  height='80px' justifyContent="right">
        <Text fontSize='2xl'>Contract Balance</Text></Flex>
  <Flex height='80px'justifyContent="right"> 
        <Text fontSize='2xl'>{parseFloat(formatEther(displayBalance)).toFixed(3)} BNB</Text>
  </Flex>
  <Flex height='80px' justifyContent="right"> 
        <Text fontSize='2xl'>Your The Cheeze</Text></Flex>
  <Flex height='80px'justifyContent="right"> 
        <Text fontSize='2xl'justifyContent="right">{displayCheese.toLocaleString()} Cheez</Text>
  </Flex>
  <Flex height='80px' justifyContent="right"> 
        <Text fontSize='2xl'>Pending Awards</Text>
  </Flex>
  <Flex  height='80px' justifyContent="right"> 
        <Text fontSize='2xl' >{parseFloat(formatEther(displayRewards)).toFixed(6)} BNB</Text>
  </Flex>
</SimpleGrid>
<Divider style={{ background: 'black' }} variant="middle" />
<SimpleGrid columns={1}  >
  <Flex height='80px' justifyContent="right">
        <Input variant='filled' placeholder='0 BNB'/>
        </Flex>
  <Flex height='80px'justifyContent="right"> 
        <Button isFullWidth={true} onClick={onClickBuyMice}>Buy Cheeze</Button>
  </Flex>
 
</SimpleGrid>

</Container>
    
    
    
    )
}