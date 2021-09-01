import web3 from 'web3'
import React from 'react'
import {Button, Grid, Item, Container, Card, Image, Segment} from "semantic-ui-react"
import {useRebalance} from "../../state/rebalance/hooks";
import {CurrencyAmount} from "@uniswap/sdk-core";
import {MATIC} from "../../constants/tokens";
import JSBI from "jsbi";


export function Rebalance() {
    const { loading = true, aaveInfo, tokenRatioUsd, tokenRatioMatic, curveDepositedAmount } = useRebalance()

    console.log('aaveInfo: ', aaveInfo)

    return (
        <Segment loading={loading}>
            <Grid columns='equal'>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    circular
                                    src='/images/aave.png'
                                />
                                <Card.Header as="a" href="https://app.aave.com/" target="_blank">Aave</Card.Header>
                                <Card.Meta>LP</Card.Meta>
                                <Card.Description>
                                    Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <p>USD/ETH <strong>{web3.utils.fromWei(tokenRatioUsd?.toString() ?? '')}</strong></p>
                                    <p>MATIC/ETH <strong>{web3.utils.fromWei(tokenRatioMatic?.toString() ?? '')}</strong></p>
                                    <p>Total Collateral: <strong>{web3.utils.fromWei(aaveInfo?.totalCollateralETH.toString() ?? '')} ETH</strong></p>
                                    <p>Total Debt: <strong>{web3.utils.fromWei(aaveInfo?.totalDebtETH.toString() ?? '')} ETH</strong></p>
                                    <p>Available Borrow: <strong>{web3.utils.fromWei(aaveInfo?.availableBorrowsETH.toString() ?? '')} ETH</strong></p>
                                    <p>Current Liquidation Threshold: <strong>{web3.utils.fromWei(aaveInfo?.availableBorrowsETH.toString() ?? '')} ETH</strong></p>
                                    <p>LTV: <strong>{aaveInfo?.ltv.toString()}</strong></p>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Container>
                            <h4>Proxy</h4>
                            <p>Health Factor: <strong>{web3.utils.fromWei(aaveInfo?.healthFactor.toString() ?? '')}</strong></p>
                            {/*<p>Deviation: <strong>0</strong></p>
                            <p>{`Curve -> Aave`}</p>*/}
                            <Button primary>
                                Rebalance
                            </Button>
                        </Container>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    circular
                                    src='/images/curve.png'
                                />
                                <Card.Header as="a" href="https://polygon.curve.fi/" target="_blank">Curve</Card.Header>
                                <Card.Meta>AMM</Card.Meta>
                                <Card.Description>
                                    Automatic market-making with dynamic peg
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <p>Staked Share: <strong>~{web3.utils.fromWei(curveDepositedAmount?.toString() ?? '')} USD</strong></p>
                                    <p>DAI+USDC+USDT</p>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}
