import React from 'react'
import Web3Modal from 'web3modal'
import {Button, Grid, Icon} from "semantic-ui-react";
import {CHAIN_INFO, SupportedChainId} from "../../constants/chains";
import {useWeb3React} from "@web3-react/core";

let web3Modal
let provider

const style = {
    header: {
        paddingTop: '2em',
        marginBottom: '3em'
    },
}

export function Header() {
    const { active, account, connector, activate, error } = useWeb3React()

    // async function login() {
    //     web3Modal = new Web3Modal({
    //         network: 'polygon',
    //         cacheProvider: true,
    //         providerOptions: {}
    //     })
    //     console.log('web3Modal: ', web3Modal)
    //     try {
    //         provider = await web3Modal.connect()
    //
    //         if (SupportedChainId[provider.chainId]) {
    //             try {
    //                 await provider.request({
    //                     method: 'wallet_switchEthereumChain',
    //                     params: [{ chainId: SupportedChainId["Polygon"] }],
    //                 });
    //             } catch (error) {
    //                 // This error code indicates that the chain has not been added to MetaMask.
    //                 // @ts-ignore
    //                 if (error.code === 4902) {
    //                     try {
    //                         const info = await provider.request(CHAIN_INFO[137]?.metamaskSettings)
    //                         console.log('network switched', info)
    //                     } catch (error) {
    //                         console.warn('Switch network error', error)
    //                     }
    //                 }
    //                 // handle other "switch" errors
    //             }
    //         }
    //     } catch(e) {
    //         console.log("Could not get a wallet connection", e);
    //         return;
    //     }
    //     const web3 = new Web3(provider)
    //     provider.on('accountsChanged', () => { window.location.reload() })
    //     provider.on('chainChanged', () => { window.location.reload() })
    //     provider.on('networkChanged', () => { window.location.reload() })
    //
    //     let netId = await web3.eth.net.getId()
    //     if (!networksConfig[Number(netId)]) netId = defaultNetwork
    //
    //     console.log('accounts: ', await web3.eth.getAccounts())
    //     const address = (await web3.eth.getAccounts())[0]
    //     setAccountAddress(address)
    //
    //     ghApp.init(web3, address, netId)
    // }

    return (
        <Grid container style={style.header}>
            <Grid.Column floated="left" width={9}>
                <h1>Safe CDP Farmer light</h1>
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
                <Button icon labelPosition="right" size="small">
                    <Icon name='connectdevelop' />
                    Connect
                </Button>
            </Grid.Column>
        </Grid>
    )
}
