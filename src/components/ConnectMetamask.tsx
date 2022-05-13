import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Box, Button, Text} from '@chakra-ui/react'
import { injected } from '../utils/connectors'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { formatAddress } from '../utils/helpers'
import { formatEther } from "@ethersproject/units";
import ETHBalance from './ETHBalance'



const ConnectMetamask = () => {

   

    const { chainId, account, activate,deactivate, setError, active,library ,connector, } = useWeb3React<Web3Provider>()
    

    const onClickConnect = () => {
      activate(injected,(error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused")
        } else {
          setError(error)
        }
      }, false)
    }

    const onClickDisconnect = () => {
        deactivate()
      }

    useEffect(() => {
      console.log(chainId, account, active,library,connector)
    })

    return (
        <div>
        {active && typeof account === 'string' ? (
          <Box
          display="flex"
          alignItems="center"
          background="gray.700"
          borderRadius="xl"
          py="0"
        >
          <Box px="3">
            <Text color="white" fontSize="md">
              <ETHBalance/>
            </Text>
          </Box>
          <Button onClick={onClickDisconnect}
            bg="gray.800"
            border="1px solid transparent"
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "blue.400",
              backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            <Text color="white" fontSize="md" fontWeight="medium" mr="2">
             
              {account &&
                `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </Text>
          </Button>
        </Box>
        ) : (
            <Button onClick={onClickConnect}>Connect Wallet</Button>

        )}
        </div>
    )
  }

export default ConnectMetamask