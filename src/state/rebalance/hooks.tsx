import { BigNumber } from "@ethersproject/bignumber";
import AAVE_ABI from '../../abis/aave.json';
import {
    useAaveContract,
    useCurveContract,
    useCurveDepositContract,
    usePriceOracleContract
} from "../../hooks/useContract";
import {useActiveWeb3React} from "../../hooks/web3";
import {useMultipleContractSingleData, useSingleCallResult} from "../multicall/hooks";
import {AAVE_ADDRESSES} from "../../constants/addresses";
import {Interface} from "@ethersproject/abi";
import JSBI from "jsbi";
import {BIG_INT_ZERO} from "../../constants/misc";
import {MATIC, USDT, WMATIC} from "../../constants/tokens";

const AAVE_INTERFACE = new Interface(AAVE_ABI)

interface RebalanceInterface {
    loading: boolean
    aaveInfo: {
        0: BigNumber,
        1: BigNumber,
        2: BigNumber,
        3: BigNumber,
        4: BigNumber,
        5: BigNumber,
        6: BigNumber,
        totalCollateralETH: BigNumber,
        totalDebtETH: BigNumber,
        availableBorrowsETH: BigNumber,
        currentLiquidationThreshold: BigNumber,
        ltv: BigNumber,
        healthFactor: BigNumber,
    } | undefined,
    tokenRatioUsd: BigNumber | undefined,
    tokenRatioMatic: BigNumber | undefined,
    curveDepositedAmount: BigNumber | undefined,
}
export function useRebalance(): RebalanceInterface {
    const { account } = useActiveWeb3React()
    let loading = true

    const aaveContract = useAaveContract()
    const priceOracleContract = usePriceOracleContract()
    const curveContract = useCurveContract()
    const curveDepositContract = useCurveDepositContract()
    // const am3CrvContract = useAm3CrvContract(account ? account : undefined, false)
    // console.log('account: ', account)
    // console.log('aaveContract: ', aaveContract)
    let aaveInfo = useSingleCallResult(
        aaveContract ? aaveContract : undefined,
        'getUserAccountData',
        [account ?? undefined],
    ).result
    const tokenRatioUsd = useSingleCallResult(
        priceOracleContract ? priceOracleContract : undefined,
        'getAssetPrice',
        [USDT.address],
    ).result?.[0] // token in ETH wei
    const tokenRatioMatic = useSingleCallResult(
        priceOracleContract ? priceOracleContract : undefined,
        'getAssetPrice',
        [WMATIC.address],
    ).result?.[0] // token in ETH wei
    const curveDepositedAmount = useSingleCallResult(
        curveDepositContract ? curveDepositContract : undefined,
        'balanceOf',
        [account ?? undefined],
    ).result?.[0]
    console.log('curveDepositedAmount: ', curveDepositedAmount)
    console.log('token: ', tokenRatioMatic)
// claimable_reward for CRV and WMATIC?
    if (aaveInfo) loading = false

    return {
        loading,
        // @ts-ignore
        aaveInfo: aaveInfo,
        tokenRatioUsd,
        tokenRatioMatic,
        curveDepositedAmount,
    }
    // useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
}
