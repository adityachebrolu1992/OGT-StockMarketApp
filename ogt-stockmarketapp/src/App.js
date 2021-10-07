import React, { useState } from 'react';
import './App.css';
import Search from './Search';
import Header from './Header';
import MyList from './MyList';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { appendFile } from 'fs';

function App() {

  const [myList, setMyList] = useState([]);
  const [walletAmount, setWalletAmount] = useState(30000);
  const [switchFlag, setSwitchFlag] = useState(false);

  function switchToMyStocks() {
    setSwitchFlag(true);
  }

  return (
    <Router className="App">
      <div id="header-container">
        <Header />
        <p id="wallet-text">wallet amount: {walletAmount} Rs</p>
      </div>
      <Link className="router-links" to="/search">Search</Link>
      <Link className="router-links" to="/myStocks">MyStocks</Link>
      {/* <Link className="router-links" to="/hello">hello</Link> */}
      {/* <button onClick={switchToMyStocks}>My Stocks</button> */}
      <Switch>
        <Route path="/search">
          <Search setWalletAmount={setWalletAmount} walletAmount={walletAmount} myList={myList} setMyList={setMyList} />
        </Route>
        <Route path="/myStocks">
          <MyList setSwitchFlag={setSwitchFlag} setMyList={setMyList} setWalletAmount={setWalletAmount} walletAmount={walletAmount} myList={myList} />
        </Route>
      </Switch>
      {/* {switchFlag ? <MyList setSwitchFlag={setSwitchFlag} setMyList={setMyList} setWalletAmount={setWalletAmount} walletAmount={walletAmount} myList={myList} /> : <Search setWalletAmount={setWalletAmount} walletAmount={walletAmount} myList={myList} setMyList={setMyList} />} */}
    </Router>
  );
}

export default App;
