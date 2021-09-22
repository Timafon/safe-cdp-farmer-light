import web3 from 'web3'
import React from 'react'
import {Button, Card, Divider, Grid, Statistic, Icon, SemanticICONS, Image, Segment, Step} from "semantic-ui-react"
import {TransferDirection, useMainInfo} from "../../state/rebalance/hooks";
import {SemanticCOLORS} from "semantic-ui-react/dist/commonjs/generic";


export function Rebalance() {
    const {
        loading = true,
        aaveInfo,
        tokenRatioUsd,
        aaveClaimableReward,
        tokenRatioMatic,
        curveDepositedAmount,
        curveClaimableRewardCrv,
        curveClaimableRewardWmatic,
        curveClaimedRewardCrv,
        curveClaimedRewardWmatic,
        targetAmountForTransfer,
        direction
    } = useMainInfo()
    const way = React.useMemo(() => {
        if (direction === TransferDirection.repay) {
            return {
                text: 'repay',
                icon: 'angle double left' as SemanticICONS,
                color: 'red' as SemanticCOLORS,
                step1: {
                    text: 'Curve.Withdraw',
                    desc: 'withdraw[read]',
                    icon: 'rocket' as SemanticICONS
                },
                step2: {
                    text: 'Curve.RemoveLiquidity',
                    desc: 'calcTokens[read], removeLiquidity[write]',
                    icon: 'plane' as SemanticICONS
                },
                step3: {
                    text: 'Aave.Repay',
                    desc: 'repay[write]',
                    icon: 'road' as SemanticICONS
                }
            }
        }
        if (direction === TransferDirection.borrow) {
            return {
                text: 'borrow',
                icon: 'angle double right' as SemanticICONS,
                color: 'green' as SemanticCOLORS,
                step1: {
                    text: 'Aave.Borrow',
                    desc: 'borrow[write]',
                    icon: 'rocket' as SemanticICONS
                },
                step2: {
                    text: 'Curve.AddLiquidity',
                    desc: 'calcTokens[read], addLiquidity[write]',
                    icon: 'plane' as SemanticICONS
                },
                step3: {
                    text: 'Curve.Deposit',
                    desc: 'approve[write], am3CrvContract.balanceOfUser[read], deposit[write]',
                    icon: 'road' as SemanticICONS
                }
            }
        }
    }, [direction])
    const isRepay = direction === TransferDirection.repay
    console.log('way: ', way)

    return (
        <Segment basic loading={loading}>
                <Grid columns={1}>
                    <Grid.Column width={16}>
                        <Statistic.Group>
                            <Statistic>
                                {isRepay ? (
                                    <>
                                        <Statistic.Value>
                                            HF
                                        </Statistic.Value>
                                        <Statistic.Label>
                                            {web3.utils.fromWei(aaveInfo?.healthFactor.toString() ?? '')}
                                        </Statistic.Label>
                                    </>
                                ) : (
                                    <>
                                        <Statistic.Label>
                                            {web3.utils.fromWei(aaveInfo?.healthFactor.toString() ?? '')}
                                        </Statistic.Label>
                                        <Statistic.Value>
                                            HF
                                        </Statistic.Value>
                                    </>
                                )}
                            </Statistic>

                            <Statistic>
                                {isRepay ? (
                                    <>
                                        <Statistic.Label>1.8</Statistic.Label>
                                        <Statistic.Value>
                                            THF
                                        </Statistic.Value>
                                    </>
                                ) : (
                                    <>
                                        <Statistic.Value>
                                            THF
                                        </Statistic.Value>
                                        <Statistic.Label>1.8</Statistic.Label>
                                    </>
                                )}
                            </Statistic>

                            <Statistic>
                                <Statistic.Value text>
                                    <Icon name='balance scale' />
                                    {direction !== undefined && (<>
                                        <span style={{ textTransform: 'uppercase' }}> {TransferDirection[direction]} </span>
                                    </>)} <br/> amount: {' '}
                                </Statistic.Value>
                                <Statistic.Label>
                                    <span>{targetAmountForTransfer.toString()} USDT</span>
                                </Statistic.Label>
                            </Statistic>

                            {/*<Statistic>
                                <Statistic.Value>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' inline circular />
                                    42
                                </Statistic.Value>
                                <Statistic.Label>Team Members</Statistic.Label>
                            </Statistic>*/}
                        </Statistic.Group>
                    </Grid.Column>

                    <Grid.Column width={16} style={{ padding: '0 1.1em' }}>
                        {(direction !== undefined && way) && (
                            <div>
                                <Segment attached="top" size="mini" fluid style={{ margin: 0, borderBottom: 0 }}>
                                    <Button content="START" icon="play" labelPosition="right" />
                                </Segment>
                                <Step.Group attached size="mini" fluid style={{ margin: 0, borderRadius: 0 }}>
                                    <Step
                                        active={true}
                                        onClick={() => {console.log('step1')}}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <Icon name={way.step1.icon} />
                                        <Step.Content>
                                            <Step.Title>
                                                {way.step1.text}
                                            </Step.Title>
                                            <Step.Description>{way.step1.desc}</Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step
                                        active={false}
                                        disabled={true}
                                        onClick={() => {console.log('step2')}}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <Icon name={way.step2.icon} />
                                        <Step.Content>
                                            <Step.Title>
                                                {way.step2.text}
                                            </Step.Title>
                                            <Step.Description>{way.step2.desc}</Step.Description>
                                        </Step.Content>
                                    </Step>
                                    <Step
                                        active={true}
                                        disabled={true}
                                        onClick={() => {console.log('step3')}}
                                        style={{ borderRadius: 0 }}
                                    >
                                        <Icon name={way.step3.icon} />
                                        <Step.Content>
                                            <Step.Title>
                                                {way.step3.text}
                                            </Step.Title>
                                            <Step.Description>{way.step3.desc}</Step.Description>
                                        </Step.Content>
                                    </Step>
                                </Step.Group>
                                <Segment attached="bottom" size="mini" fluid style={{ margin: 0 }}>
                                    <div>{way.step1.desc}</div>
                                </Segment>
                            </div>
                        )}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Grid stretched stackable>
                            <Grid.Column width={8}>
                                <Card fluid>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            circular
                                            src='/images/aave.png'
                                        />
                                        <Card.Header as="a" href="https://app.aave.com/" target="_blank">Aave</Card.Header>
                                        <Card.Meta>Deposit MATIC - Borrow USDT</Card.Meta>
                                        {/*<Card.Description>
                            Aave is an open source and non-custodial liquidity protocol for earning interest on deposits and borrowing assets.
                        </Card.Description>*/}
                                        <Divider/>
                                        <Card.Description>
                                            <p>1 USD = {web3.utils.fromWei(tokenRatioUsd?.toString() ?? '')} ETH</p>
                                            <p>1 MATIC = {web3.utils.fromWei(tokenRatioMatic?.toString() ?? '')} ETH</p>
                                            <br/>
                                            <p>Claimable Reward: <strong>{web3.utils.fromWei(aaveClaimableReward?.toString() ?? '')} WMATIC</strong></p>
                                            <p>Available Borrow: <strong>{web3.utils.fromWei(aaveInfo?.availableBorrowsETH.toString() ?? '')} ETH</strong></p>
                                            <p>Total Debt: <strong>{web3.utils.fromWei(aaveInfo?.totalDebtETH.toString() ?? '')} ETH</strong></p>
                                            <p>Total Collateral: <strong>{web3.utils.fromWei(aaveInfo?.totalCollateralETH.toString() ?? '')} ETH</strong></p>
                                            <br/>
                                            <p>LTV: <strong>{aaveInfo?.ltv.toString()}</strong></p>
                                            <p>Current Liquidation Threshold: <strong>{aaveInfo?.currentLiquidationThreshold.toString()}</strong></p>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card fluid>
                                    <Card.Content>
                                        <Image
                                            floated='right'
                                            size='mini'
                                            circular
                                            src='/images/curve.png'
                                        />
                                        <Card.Header as="a" href="https://polygon.curve.fi/" target="_blank">Curve</Card.Header>
                                        <Card.Meta>aDAI + aUSDC + aUSDT</Card.Meta>
                                        {/*<Card.Description>
                            Automatic market-making with dynamic peg
                        </Card.Description>*/}
                                        <Divider/>
                                        <Card.Description>
                                            <p>Staked Share: <strong>{web3.utils.fromWei(curveDepositedAmount?.toString() ?? '')} am3CRV-Gauge</strong></p>
                                            <br/>
                                            <p>Claimable CRV: <strong>{web3.utils.fromWei(curveClaimableRewardCrv?.toString() ?? '')} CRV</strong></p>
                                            <p>Claimable WMATIC: <strong>{web3.utils.fromWei(curveClaimableRewardWmatic?.toString() ?? '')} WMATIC</strong></p>
                                            <br/>
                                            <p>Claimed CRV: <strong>{web3.utils.fromWei(curveClaimedRewardCrv?.toString() ?? '')} CRV</strong></p>
                                            <p>Claimed WMATIC: <strong>{web3.utils.fromWei(curveClaimedRewardWmatic?.toString() ?? '')} WMATIC</strong></p>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
            </Grid>
        </Segment>
    )
}
