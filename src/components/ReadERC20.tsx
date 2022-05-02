import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units"
import { ethers } from 'ethers'
import { Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { ERC20ABI as abi } from "../abi/ERC20ABI"
import { isAddress } from 'ethers/lib/utils';
import ETHBalance from './ETHBalance';

interface Props {
    addressContract: string
}
declare let window: any;

const fetcher = (library: Web3Provider, abi?: any) => (...args: any) => {

    const [arg1, arg2, ...params] = args
    if (isAddress(arg1)) {
        const address = arg1
        const method = arg2
        const contract = new Contract(address, abi, library)
        return contract[method](...params)
    }
    const method = arg1;

    return library[method](arg2, ...params)

}


export default function ReadERC20(props: Props) {
    const addressContract = props.addressContract
    const [symbol, setSymbol] = useState<string>("")
    const [miners, setMiners] = useState<string>()


    const { account, active, library } = useWeb3React<Web3Provider>()

    const { data: balance } = useSWR(["getBalance", addressContract, 'latest'], {
        fetcher: fetcher(library, abi),
    })

    const { data: rewards } = useSWR([addressContract, "cheezRewards", account], {
        fetcher: fetcher(library, abi)
    })

    const { data: cheese, mutate } = useSWR([addressContract, "getEggsSinceLastHatch", account], {
        fetcher: fetcher(library, abi)
    })

    useEffect(() => {
        if (!(active && account && library)) return
        console.log('still alive')

        const erc20: Contract = new Contract(addressContract, abi, library);
        library.getCode(addressContract).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return

            //   erc20.symbol().then((result:string)=>{
            //       setSymbol(result)
            //   }).catch('error', console.error)


        })

        erc20.getMyMiners(account).then((result: string) => {
            setMiners(parseFloat((result)).toLocaleString())
        }).catch('error', console.error);

        //called only when changed to active
    }, [active])

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

    if (balance)
        displayBalance = balance;
    if (rewards)
        displayRewards = rewards;
    if (cheese)
        displayCheese = cheese;


    return (<div>
        <div className="columns w-row">
            <div className="column-2 w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="name" className="field-label-3">Contract Balance:</label></div>
            <div className="w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email-2" className="field-label">{parseFloat(formatEther(displayBalance)).toFixed(3)} {symbol}</label></div>
        </div>
        <div className="columns w-row">
            <div className="column-2 w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label-4">Your Cheeze:</label></div>
            <div className="w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label">{displayCheese.toLocaleString()} {symbol}</label></div>
        </div>
        <div className="columns w-row">
            <div className="column-2 w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label-5">Mice:</label></div>
            <div className="w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label">{miners}</label></div>
        </div>
        <div className="columns w-row">
            <div className="column-2 w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label-5">Your Pending Rewards:</label></div>
            <div className="w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label">{parseFloat(formatEther(displayRewards)).toFixed(6)}</label></div>
        </div>
        <div className="columns w-row">
            <div className="column-2 w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label-5"></label></div>
            <div className="w-col w-col-6 w-col-small-6 w-col-tiny-6"><label htmlFor="email" className="field-label"><button name="Compound" onClick={onClickClaimRewards}>Claim Rewards</button></label></div>
        </div>
        <div className="columns-2 w-row">
            <div className="w-col w-col-6"><input type="number" className="w-input" name="Amount" data-name="Amount" placeholder="10.0" id="Amount" /></div>
            <div className="w-col w-col-6"><input type="submit" value="Buy" data-wait="Please wait..." className="w-button" onClick={onClickBuyMice} /> <ETHBalance /></div>
        </div>

    </div>
    )
}