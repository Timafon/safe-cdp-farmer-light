import React from 'react'
import {Button, Grid, Image, Segment} from "semantic-ui-react";
import {ALL_SUPPORTED_CHAIN_IDS} from "../../constants/chains";
import {shortenAddress} from "../../utils";
import setupNetwork from '../../utils/setupNetwork';
import {useActiveWeb3React} from "../../hooks/web3";
import {injected} from '../../connectors'
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {NetworkContextName} from "../../constants/misc";


const style = {
    header: {
        paddingTop: '2em',
        marginBottom: '1.5em'
    },
}

export function Header() {
    const { chainId, account } = useActiveWeb3React()
    const { active: activeNetwork, activate: activateNetwork } = useWeb3React(NetworkContextName)
    const isAcceptableNetwork = React.useMemo(
        () => !!ALL_SUPPORTED_CHAIN_IDS.find(i => i === chainId),
        [chainId]
    )
    const setupAccount = React.useCallback(() => {
        if (activeNetwork) {
            const openWallet = async () => {
                activateNetwork(injected, undefined, true).catch((err) => {
                    if (err instanceof UnsupportedChainIdError) {
                        setupNetwork()
                    } else {
                        console.error(err)
                    }
                })
            }

            openWallet()
        }
    }, [activeNetwork, activateNetwork])

    return (
        <Segment basic>
            <Grid container stretched stackable verticalAlign="middle" style={style.header}>
                <Grid.Column width={8}>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={3}>
                            <Image
                                size='small'
                                src='/images/farmer.png'
                            />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h1>Safe CDP Farmer <em>light</em></h1>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Grid stackable verticalAlign="middle" textAlign="right">
                        <Grid.Column width={10} floated="right">
                            <p>{account && shortenAddress(account, 4)}</p>
                        </Grid.Column>

                        {(!account || !isAcceptableNetwork) && (
                            <Grid.Column width={6} floated="right">
                                <Button size="small" onClick={!isAcceptableNetwork ? setupNetwork : setupAccount}>
                                    {!isAcceptableNetwork ? 'Switch Network' : 'Connect'}
                                </Button>
                            </Grid.Column>
                        )}
                    </Grid>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}
