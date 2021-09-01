import { InjectedConnector } from '@web3-react/injected-connector'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '../constants/chains'
import { NetworkConnector } from './NetworkConnector'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.Polygon]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
}

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 137,
})

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})
