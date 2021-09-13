import { Token } from '@uniswap/sdk'
import { SupportedChainId } from './chains'

export const WETH = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    18,
    'WETH',
    'Wrapped Ether'
)
export const MATIC = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    18,
    'MATIC',
    'MATIC'
)
export const CRV = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x172370d5cd63279efa6d502dab29171933a610af',
    18,
    'CRV',
    'CRV (PoS)'
)
// claim_rewards
export const amAAVE = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360',
    18,
    'amAAVE',
    'Aave Matic Market AAVE',
)
// claim_rewards
export const amWMATIC = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4',
    18,
    'amWMATIC',
    'Aave Matic Market WMATIC',
)
// claim_rewards
export const vrblDbmUSDT = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x8038857FD47108A07d1f6Bf652ef1cBeC279A2f3',
    18,
    'vrblDbmUSDT',
    'Aave Matic Market variable debt mUSDT',
)
export const am3CRV = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171',
    18,
    'am3CRV',
    'am3CRV'
)
export const am3CRVGauge = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171',
    18,
    'am3CRV-gauge',
    'am3CRVGauge'
)
export const WMATIC = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
)
export const USDT = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    18,
    'USDT',
    'Tether USD'
)
export const sUSDT = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0xe590cfca10e81FeD9B0e4496381f02256f5d2f61',
    18,
    'sUSDT',
    'sUSDT'
)
export const aUSDT = new Token(
    //@ts-ignore
    SupportedChainId.Polygon,
    '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
    18,
    'aUSDT',
    'aUSDT'
)
