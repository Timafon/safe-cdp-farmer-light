import AAVE_ABI from '../../abis/aave.json';
import {
    useAaveContract,
    useAaveICContract,
    useAm3crvGaugeContract,
    useCurveContract,
    useCurveDepositContract,
    usePriceOracleContract
} from "../../hooks/useContract";
import {useActiveWeb3React} from "../../hooks/web3";
import {useSingleCallResult, useSingleContractMultipleData} from "../multicall/hooks";
import {Interface} from "@ethersproject/abi";
import {BigNumber} from "@ethersproject/bignumber";
import {BIG_INT_ZERO, ZERO_ADDRESS} from "../../constants/misc";
import {WETH, amAAVE, amWMATIC, CRV, USDT, vrblDbmUSDT, WMATIC, MATIC} from "../../constants/tokens";
import React from "react";
import {ALL_SUPPORTED_CHAIN_IDS} from "../../constants/chains";
import {Fraction, TokenAmount, JSBI} from "@uniswap/sdk";

const AAVE_INTERFACE = new Interface(AAVE_ABI)

const TARGET_HF = JSBI.BigInt('1800000000000000000')
// const targetHf = new TokenAmount(WETH, TARGET_HF)
const MIN_TARGET_HF = JSBI.BigInt('1750000000000000000')
// const minTargetHfEth = new TokenAmount(WETH, MIN_TARGET_HF)
const MAX_TARGET_HF = JSBI.BigInt('1850000000000000000')
// const maxTargetHfEth = new TokenAmount(WETH, MAX_TARGET_HF)
const MATIC_LT = JSBI.BigInt('650000000000000000')
// const maticLt = new TokenAmount(WETH, MATIC_LT)
const UNDERLYING = JSBI.BigInt(1)
const RATE_MODE = JSBI.BigInt(2)

export enum TransferDirection {
    repay,
    borrow
}

interface RebalanceInterface {
    loading: boolean
    aaveInfo: {
        0?: JSBI,
        1?: JSBI,
        2?: JSBI,
        3?: JSBI,
        4?: JSBI,
        5?: JSBI,
        6?: JSBI,
        totalCollateralETH: JSBI,
        totalDebtETH: JSBI,
        availableBorrowsETH: JSBI,
        currentLiquidationThreshold: JSBI,
        ltv: JSBI,
        healthFactor: JSBI,
    } | undefined,
    aaveClaimableReward: JSBI | undefined,
    tokenRatioUsd: JSBI | undefined,
    tokenRatioMatic: JSBI | undefined,

    curveDepositedAmount: JSBI | undefined,
    curveClaimableRewardCrv: JSBI | undefined
    curveClaimableRewardWmatic: JSBI | undefined,
    curveClaimedRewardCrv: JSBI | undefined
    curveClaimedRewardWmatic: JSBI | undefined,

    targetAmountForTransfer: number,
    direction?: TransferDirection
}
export function useMainInfo(acc?: string): RebalanceInterface {
    let { account, chainId } = useActiveWeb3React()
    account = acc ? acc : account
    const isAcceptableNetwork = React.useMemo(
        () => !!ALL_SUPPORTED_CHAIN_IDS.find(i => i === chainId),
        [chainId]
    )

    let loading = true
    let direction
    let targetAmountForTransfer = 0

    const aaveContract = useAaveContract()
    const aaveICContract = useAaveICContract()
    const priceOracleContract = usePriceOracleContract()
    const curveContract = useCurveContract()
    const curveDepositContract = useCurveDepositContract()
    const am3crvGaugeContract = useAm3crvGaugeContract()

    const aaveInfo = useSingleCallResult(
        aaveContract ? aaveContract : undefined,
        'getUserAccountData',
        [account ?? undefined],
    )?.result

    const aaveClaimableReward = useSingleCallResult(
        aaveICContract,
        'getRewardsBalance', // getRewardsBalance
        [[amAAVE.address ?? undefined, amWMATIC.address ?? undefined, vrblDbmUSDT.address ?? undefined], account ?? undefined]
    )?.result?.[0]
    // const aaveClaimableReward = JSBI.BigInt(0)

    const usdtEthPair = useSingleCallResult(
        priceOracleContract,
        'getAssetPrice',
        [USDT.address],
    )?.result?.[0]

    const tokenRatioUsd = useSingleCallResult(
        priceOracleContract ? priceOracleContract : undefined,
        'getAssetPrice',
        [USDT.address],
    )?.result?.[0] // token in ETH wei

    const tokenRatioMatic = useSingleCallResult(
        priceOracleContract ? priceOracleContract : undefined,
        'getAssetPrice',
        [WMATIC.address],
    )?.result?.[0] // token in ETH wei

    const curveDepositedAmount = useSingleCallResult(
        curveDepositContract ? curveDepositContract : undefined,
        'balanceOf',
        [account ?? undefined],
    )?.result?.[0]

    let curveClaimableRewards = useSingleContractMultipleData(
        curveDepositContract,
        'claimable_reward',
        [[account ?? undefined, CRV.address], [account ?? undefined, WMATIC.address]],
        )

    let curveClaimedRewards = useSingleContractMultipleData(
        curveDepositContract,
        'claimed_reward',
        [[account ?? undefined, CRV.address], [account ?? undefined, WMATIC.address]],
    )
// TODO handle errors, loadings, etc.
    const curveClaimableRewardCrv = curveClaimableRewards[0]?.result?.[0]
    const curveClaimedRewardCrv = curveClaimedRewards[0]?.result?.[0]
    const curveClaimableRewardWmatic = curveClaimableRewards[1]?.result?.[0]
    const curveClaimedRewardWmatic = curveClaimedRewards[1]?.result?.[0]

    if (aaveInfo && usdtEthPair) {
        const curHf = JSBI.BigInt(aaveInfo.healthFactor)
        const totalCollateralEth = JSBI.BigInt(aaveInfo.totalCollateralETH)
        const totalDebtEth = JSBI.BigInt(aaveInfo.totalDebtETH)

        if (JSBI.LT(curHf, MIN_TARGET_HF)) {
            direction = TransferDirection.repay
            targetAmountForTransfer =
                JSBI.toNumber(
                    JSBI.subtract(
                        totalDebtEth,
                        JSBI.divide(JSBI.multiply(totalCollateralEth, MATIC_LT), TARGET_HF)
                    )
                ) / JSBI.toNumber(JSBI.BigInt(usdtEthPair))
        }
        if (JSBI.GT(curHf, MAX_TARGET_HF)) {
            direction = TransferDirection.borrow
            targetAmountForTransfer =
                JSBI.toNumber(
                    JSBI.subtract(
                        JSBI.divide(JSBI.multiply(totalCollateralEth, MATIC_LT), TARGET_HF),
                        totalDebtEth
                    )
                ) / JSBI.toNumber(JSBI.BigInt(usdtEthPair))

        }

        loading = false
    }

    if (!account || !isAcceptableNetwork) return {
        loading: false,
        aaveInfo: {
            totalCollateralETH: BIG_INT_ZERO,
            totalDebtETH: BIG_INT_ZERO,
            availableBorrowsETH: BIG_INT_ZERO,
            currentLiquidationThreshold: BIG_INT_ZERO,
            ltv: BIG_INT_ZERO,
            healthFactor: BIG_INT_ZERO,
        },
        aaveClaimableReward: BIG_INT_ZERO,
        tokenRatioUsd: BIG_INT_ZERO,
        tokenRatioMatic: BIG_INT_ZERO,
        curveDepositedAmount: BIG_INT_ZERO,
        curveClaimableRewardCrv: BIG_INT_ZERO,
        curveClaimableRewardWmatic: BIG_INT_ZERO,
        curveClaimedRewardCrv: BIG_INT_ZERO,
        curveClaimedRewardWmatic: BIG_INT_ZERO,
        targetAmountForTransfer,
        direction
    }
console.log('targetAmountForTransfer: ', targetAmountForTransfer)
    return {
        loading,
        // @ts-ignore
        aaveInfo: aaveInfo,
        aaveClaimableReward,
        tokenRatioUsd,
        tokenRatioMatic,

        curveDepositedAmount,
        curveClaimableRewardWmatic,
        curveClaimableRewardCrv,
        curveClaimedRewardWmatic,
        curveClaimedRewardCrv,

        targetAmountForTransfer,
        direction
    }
    // useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
}

export function useRepay(acc: string, targetAmountForTransfer: number) {
    let { account } = useActiveWeb3React()
    account = acc ? acc : account
    // [1][write] await curveDepositContract["withdraw(uint256)"] [write]
    // [2][read] await curveContract.calc_token_amount(amounts, false) [read]
    // [3][write] await curveContract["remove_liquidity_imbalance(uint256[3],uint256,bool)"] [write]
    // [4][write] await aaveProxyContract.repay(asset, amount, rateMode, onBehalfOf) [write]
    const aaveContract = useAaveContract()
    const aaveICContract = useAaveICContract()
    const priceOracleContract = usePriceOracleContract()
    const curveContract = useCurveContract()
    const curveDepositContract = useCurveDepositContract()
    const am3crvGaugeContract = useAm3crvGaugeContract()

    // https://curve.readthedocs.io/dao-gauges.html?highlight=withdraw#deposits-and-withdrawals
    // am3Crv-gauge -> am3Crv
    const withdrawAmount = JSBI.divide(
        JSBI.multiply(
            JSBI.multiply(JSBI.BigInt(targetAmountForTransfer), JSBI.BigInt(1000000000000)),
            JSBI.BigInt(99)
        ),
        JSBI.BigInt(100)
    ).toString()
    const isCurveWithdrawSuccessful = useSingleCallResult(
        curveDepositContract,
        'withdraw(uint256)',
        // почему 99% for withdraw from aave???
        // может потому что я ловил баги, если пытался снять больше или неправильно округлял числа???
        [withdrawAmount]
    )?.result?.[0]

    const withdrawAmountBN = JSBI.BigInt(targetAmountForTransfer)
    const listWithdrawalTokensAmounts = [BIG_INT_ZERO, BIG_INT_ZERO, withdrawAmountBN]
    //?https://curve.readthedocs.io/factory-deposits.html?highlight=calc_token_amount#DepositZap.calc_token_amount
    // Calculate addition or reduction in token supply from a deposit or withdrawal
    let maxBurnAmount = useSingleCallResult(
        curveContract,
        'calc_token_amount(uint256[3],uint256,bool)',
        // почему 101%? не помню
        [listWithdrawalTokensAmounts, 'false']
    )?.result?.[0]
    maxBurnAmount = JSBI.divide(
        JSBI.multiply(
            JSBI.BigInt(maxBurnAmount),
            JSBI.BigInt(101)
        ),
        JSBI.BigInt(100)
    )
    //?https://curve.readthedocs.io/factory-pools.html?highlight=remove_liquidity_imbalance#StableSwap.remove_liquidity_imbalance
    // am3Crv -> USDT
    // Withdraw coins in an imbalanced amount
    const isRemoveLiquiditySuccessful = useSingleCallResult(
        curveContract,
        'remove_liquidity_imbalance(uint256[3],uint256,bool)',
        // почему 99% for withdraw from aave???
        // может потому что я ловил баги, если пытался снять больше или неправильно округлял числа???
        [listWithdrawalTokensAmounts, maxBurnAmount, UNDERLYING]
    )?.result?.[0]

    const asset = USDT.address
    const amounts = listWithdrawalTokensAmounts
    const rateMode = RATE_MODE
    const onBehalfOf = account || ZERO_ADDRESS // TODO
    // https://docs.aave.com/developers/the-core-protocol/lendingpool#repay
    const isRepaySuccessful = useSingleCallResult(
        aaveContract,
        'repay',
        [asset, amounts, rateMode, onBehalfOf]
    )?.result?.[0]
}

export function useBorrow() {
    // [1][write] await aaveProxyContract.borrow(asset, amount, rateMode, referralCode, onBehalfOf) [write]
    // [2][read] await curveContract.calc_token_amount(amounts, true) [read]
    // [3][write] await curveContract["add_liquidity(uint256[3],uint256,bool)"] [write]
    // [4][write] await am3CrvContract.approve(address, "0xffffffffffffffffffffff") [write]
    // [5][read] await am3CrvContract.balanceOf(address) [read]
    // [6][write] await curveDepositContract["deposit(uint256)"] [write]
}
