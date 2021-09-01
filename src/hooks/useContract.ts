import { Contract } from '@ethersproject/contracts'

import MULTICALL_ABI from '../abis/multicall.json'
import AAVE_PROXY_ABI from '../abis/aave-proxy.json'
import CURVE_ABI from '../abis/curve.json'
import CURVE_DEPOSIT_ABI from '../abis/curve-deposit.json'
import PRICE_ORACLE_ABI from '../abis/price-oracle.json'

import { useMemo } from 'react'
import { getContract } from '../utils'
import { useActiveWeb3React } from './web3'
import {
    AAVE_ADDRESSES,
    AAVE_PROXY_ADDRESSES,
    CURVE_ADDRESSES,
    CURVE_DEPOSIT_ADDRESSES,
    MULTICALL_ADDRESS,
    PRICE_ORACLE_ADDRESSES
} from "../constants/addresses";


// returns null on errors
export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any,
    withSignerIfPossible = true
): T | null {
    const { library, account, chainId } = useActiveWeb3React()

    return useMemo(() => {
        if (!addressOrAddressMap || !ABI || !library || !chainId) return null
        let address: string | undefined
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[chainId]
        if (!address) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useMulticallContract(): Contract | null {
    return useContract(MULTICALL_ADDRESS, MULTICALL_ABI, false)
}

export function usePriceOracleContract(): Contract | null {
    return useContract(PRICE_ORACLE_ADDRESSES, PRICE_ORACLE_ABI, true)
}
export function useAaveContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(AAVE_ADDRESSES, AAVE_PROXY_ABI, withSignerIfPossible)
}
export function useCurveContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(CURVE_ADDRESSES, CURVE_ABI, withSignerIfPossible)
}
export function useCurveDepositContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(CURVE_DEPOSIT_ADDRESSES, CURVE_DEPOSIT_ABI, withSignerIfPossible)
}

