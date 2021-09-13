import { NETWORK_CHAIN_ID } from '../connectors'
import getNetworkSettings from './getNetworkSettings'

/**
 * Prompt the user to add a given network to Metamask,
 * or switch to a given network if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export default async function setupNetwork(): Promise<boolean> {
  const settings = getNetworkSettings(NETWORK_CHAIN_ID)
  const provider = (window as Window)?.ethereum

  if (provider && settings) {
    try {
      await provider.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: settings.chainId }],
      });
      return true
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await provider.request?.({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: settings.chainId, rpcUrl: settings }],
          });
          return true
        } catch (addError) {
          // handle "add" error
          return false
        }
      }
      // handle other "switch" errors
      return false
    }
  } else {
    console.error("Can't setup the network on metamask because window.ethereum is undefined")
    return false
  }
}
