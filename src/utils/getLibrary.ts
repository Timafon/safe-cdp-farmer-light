import { Web3Provider } from '@ethersproject/providers'
// import Web3Modal from "web3modal";
//
// let web3Modal
// console.log('lel')
export default function getLibrary(provider: any): Web3Provider {
  // web3Modal = new Web3Modal({
  //   network: 'polygon',
  //   cacheProvider: true,
  //   providerOptions: {}
  // })
  // console.log('web3Modal: ', web3Modal)
  // web3Modal.connect().then(res => console.log('res: ', res))
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  )
  library.pollingInterval = 15_000
  return library
}
