export enum SupportedChainId {
    Polygon = 137, // https://polygon-mainnet.infura.io/v3/2343217699c44b45851935789f1f89e6 // MATIC
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    SupportedChainId.Polygon,
]

export type SupportedChainIdType = typeof ALL_SUPPORTED_CHAIN_IDS[number]

interface LayerInfo {
    readonly docs?: string
    readonly explorer: string
    readonly infoLink?: string
    readonly label: string
    readonly metamaskSettings: any
}

type ChainInfo = { readonly [chainId: number]: LayerInfo } &
    { readonly [chainId in SupportedChainIdType]: LayerInfo }

export const CHAIN_INFO: ChainInfo = {
    [SupportedChainId.Polygon]: {
        // bridge: 'https://bridge.arbitrum.io/',
        // docs: 'https://offchainlabs.com/',
        explorer: 'https://polygonscan.com/',
        // infoLink: 'https://info.uniswap.org/#/arbitrum',
        label: 'Polygon',
        // logoUrl: arbitrumLogoUrl,
        metamaskSettings: {
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x2a',
                chainName: 'Polygon',
                nativeCurrency: {
                    name: 'Matic',
                    symbol: 'MATIC',
                    decimals: 18
                },
                rpcUrls: ['https://polygon-mainnet.infura.io/v3/7bb4ce3d94504bc19a3d6653b8a6ab87'],
                blockExplorerUrls: ['https://polygonscan.com/']
            }]
        }
    },
}
