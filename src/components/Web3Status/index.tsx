import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { NetworkContextName } from '../../constants/misc'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import {Loader, Button, Grid, Icon} from "semantic-ui-react";


// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { account, error } = useWeb3React()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <Button id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {hasPendingTransactions ? (
          <Grid>
            <Grid.Column width={6}>
              <p>
                {pending?.length} Pending
              </p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Loader active />
            </Grid.Column>
          </Grid>
        ) : (
          <>
            <p>{shortenAddress(account)}</p>
          </>
        )}
      </Button>
    )
  } else if (error) {
    return (
      <Button onClick={toggleWalletModal}>
        <Icon name="hand spock" />
        <p>{error instanceof UnsupportedChainIdError ? <span>Wrong Network</span> : <span>Error</span>}</p>
      </Button>
    )
  } else {
    return (
      <Button id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <p>
          Connect to a wallet
        </p>
      </Button>
    )
  }
}

export default function Web3Status() {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
    </>
  )
}
