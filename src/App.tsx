import React from 'react'
import {Container } from "semantic-ui-react";
import {Rebalance} from "./pages/Rebalance/Rebalance";
import {Header} from "./components/Header";
import Web3ReactManager from "./components/Web3ReactManager";


function App() {
  return (
      <Web3ReactManager>
          <Container>
              <Header />
              <Rebalance />
          </Container>
      </Web3ReactManager>
  );
}

export default App;
