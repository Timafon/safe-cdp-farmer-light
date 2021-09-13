import { Contract } from '@ethersproject/contracts'

import MULTICALL_ABI from '../abis/multicall.json'
import AAVE_PROXY_ABI from '../abis/aave-proxy.json'
import AAVE_IC_ABI from '../abis/aave-incentivies-controller.json'
import AM3CRV_GAUGE_ABI from '../abis/am3crv-gauge-token.json'
import CURVE_ABI from '../abis/curve.json'
import CURVE_DEPOSIT_ABI from '../abis/curve-deposit.json'
import PRICE_ORACLE_ABI from '../abis/price-oracle.json'

import { useMemo } from 'react'
import { getContract } from '../utils'
import { useActiveWeb3React } from './web3'
import {
    AAVE_ADDRESSES, AAVE_INCENTIVIZE_ADDRESSES,
    AAVE_PROXY_ADDRESSES,
    CURVE_ADDRESSES,
    CURVE_DEPOSIT_ADDRESSES,
    MULTICALL_ADDRESS,
    PRICE_ORACLE_ADDRESSES
} from "../constants/addresses";
import {am3CRVGauge} from "../constants/tokens";


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
export function useAaveICContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(AAVE_INCENTIVIZE_ADDRESSES, AAVE_IC_ABI, withSignerIfPossible)
}
// export function useAaveDepositContract(withSignerIfPossible?: boolean): Contract | null {
//     return useContract(AAVE, AAVE_IC_ABI, withSignerIfPossible)
// }
export function useAm3crvGaugeContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(am3CRVGauge.address, AM3CRV_GAUGE_ABI, withSignerIfPossible)
}
export function useCurveContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(CURVE_ADDRESSES, CURVE_ABI, withSignerIfPossible)
}
export function useCurveDepositContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract(CURVE_DEPOSIT_ADDRESSES, CURVE_DEPOSIT_ABI, withSignerIfPossible)
}

