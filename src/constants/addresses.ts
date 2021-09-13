import { SupportedChainId } from "./chains";

type AddressMap = { [chainId: number]: string }

export const MULTICALL_ADDRESS: AddressMap = {
    [SupportedChainId.Polygon]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
}
export const PRICE_ORACLE_ADDRESSES: AddressMap = {
    [SupportedChainId.Polygon]: '0x0229f777b0fab107f9591a41d5f02e4e98db6f2d',
}
export const AAVE_ADDRESSES: AddressMap = {
    [SupportedChainId.Polygon]: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
}
export const AAVE_PROXY_ADDRESSES: AddressMap = {
    [SupportedChainId.Polygon]: '0x6A8730F54b8C69ab096c43ff217CA0a350726ac7',
}
export const AAVE_INCENTIVIZE_ADDRESSES: AddressMap = {
    // Proxy 0x2c901a65071c077c78209b06ab2b5d8ec285ab84
    // Straight 0x357D51124f59836DeD84c8a1730D72B749d8BC23
    [SupportedChainId.Polygon]: '0x357D51124f59836DeD84c8a1730D72B749d8BC23',
}
export const CURVE_ADDRESSES: AddressMap = {
    [SupportedChainId.Polygon]: '0x445fe580ef8d70ff569ab36e80c647af338db351',
}
export const CURVE_DEPOSIT_ADDRESSES: AddressMap = {
    [SupportedChainId.Polygon]: '0x19793B454D3AfC7b454F206Ffe95aDE26cA6912c',
}
