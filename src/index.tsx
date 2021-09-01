import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {createWeb3ReactRoot, Web3ReactProvider} from "@web3-react/core";
import {NetworkContextName} from "./constants/misc";
import getLibrary from "./utils/getLibrary";
import ApplicationUpdater from './state/application/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ThemeProvider, {ThemedGlobalStyle} from "./theme";
import App from './App';
import store from './state/index'
import 'semantic-ui-css/semantic.min.css'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
    return (
        <>
            <ApplicationUpdater />
            <TransactionUpdater />
            <MulticallUpdater />
        </>
    )
}


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Web3ReactProvider getLibrary={getLibrary}>
              <Web3ProviderNetwork getLibrary={getLibrary}>
                  <Updaters />
                  <ThemeProvider>
                      <ThemedGlobalStyle />
                      <App />
                  </ThemeProvider>
              </Web3ProviderNetwork>
          </Web3ReactProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
