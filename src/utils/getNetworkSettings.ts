import {CHAIN_INFO, SupportedChainId} from "../constants/chains";

export default function getNetworkSettings(chainId: SupportedChainId): Record<string, any> {
  return CHAIN_INFO[chainId]
}
