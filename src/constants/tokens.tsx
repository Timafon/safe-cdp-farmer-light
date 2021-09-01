import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'

export const MATIC = new Token(
    SupportedChainId.Polygon,
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    18,
    'MATIC',
    'MATIC'
)
export const am3CRV = new Token(
    SupportedChainId.Polygon,
    '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171',
    18,
    'am3CRV',
    'am3CRV'
)
export const WMATIC = new Token(
    SupportedChainId.Polygon,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
)
export const USDT = new Token(
    SupportedChainId.Polygon,
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    18,
    'USDT',
    'Tether USD'
)
export const sUSDT = new Token(
    SupportedChainId.Polygon,
    '0xe590cfca10e81FeD9B0e4496381f02256f5d2f61',
    18,
    'sUSDT',
    'sUSDT'
)
export const vUSDT = new Token(
    SupportedChainId.Polygon,
    '0x8038857FD47108A07d1f6Bf652ef1cBeC279A2f3',
    18,
    'vUSDT',
    'vUSDT'
)
export const aUSDT = new Token(
    SupportedChainId.Polygon,
    '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
    18,
    'aUSDT',
    'aUSDT'
)
