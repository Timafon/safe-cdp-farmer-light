const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

export enum SupportedChainId {
    Polygon = 137,
}

export const ALL_SUPPORTED_CHAIN_IDS: Array<SupportedChainId> = [
    SupportedChainId.Polygon,
]

export type SupportedChainIdType = typeof ALL_SUPPORTED_CHAIN_IDS[number]

interface LayerInfo {
    readonly chainId: string,
    readonly chainName: string,
    readonly nativeCurrency: {
        readonly name: string,
        readonly symbol: string,
        readonly decimals: number,
    },
    readonly rpcUrls: Array<string>,
    readonly blockExplorerUrls: Array<string>
}

type ChainInfo = { readonly [chainId: number]: LayerInfo } &
    { readonly [chainId in SupportedChainIdType]: LayerInfo }

export const CHAIN_INFO: ChainInfo = {
    [SupportedChainId.Polygon]: {
        chainId: '0x89',
        chainName: 'Polygon',
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: [`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`],
        blockExplorerUrls: ['https://polygonscan.com/'],
    },
}
