import React, { Component } from 'react';
import axios from 'axios';
import './Today.scss';

export default class Today extends Component {
  state = {
    btcPrice: '',
    ltcPrice: '',
    ethPrice: '',
  };

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(({ data }) => {
        this.setState({
          btcPrice: data.BTC.USD,
          ethPrice: data.ETH.USD,
          ltcPrice: data.LTC.USD,
        });
      })
      .catch(console.log)
  }

  render() {
    return (
      <div className="today--section container">
        <h2>Current Price</h2>

        <div className="columns today--section__box">
          <div className="column btc--section">
            <h5>${this.state.btcPrice}</h5>
            <p>1 BTC</p>
          </div>

          <div className="column eth--section">
            <h5>${this.state.ethPrice}</h5>
            <p>1 ETH</p>
          </div>

          <div className="column ltc--section">
            <h5>${this.state.ltcPrice}</h5>
            <p>1 LTC</p>
          </div>
        </div>
      </div>
    )
  }
}