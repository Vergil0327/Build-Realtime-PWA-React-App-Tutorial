import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import PusherConfig from '../pusherConfig'
import './Today.scss';

export default class Today extends Component {
  state = {
    btcPrice: '',
    ltcPrice: '',
    ethPrice: '',
  };
  pusher = {};
  prices = {};

  componentDidMount() {
    this.pusher = new Pusher(PusherConfig.key, {
      cluster: PusherConfig.cluster,
      encrypted: true
    });

    // Subscribe to the 'coin-prices' channel
    this.prices = this.pusher.subscribe('coin-prices');

    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
        .then(response => this.sendPricePusher(response.data))
        .catch(console.log)
    }, 10000);
    // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes 
    this.prices.bind('prices', price => {
      this.setState({ btcPrice: price.prices.BTC.USD });
      this.setState({ ethPrice: price.prices.ETH.USD });
      this.setState({ ltcPrice: price.prices.LTC.USD });
    }, this);


    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
      .then(({ data }) => {
        this.setState({
          btcPrice: data.BTC.USD,
          ethPrice: data.ETH.USD,
          ltcPrice: data.LTC.USD,
        });
      })
      .catch(console.log);
  }

  sendPricePusher (data) {
    axios.post('/prices/new', {
        prices: data
    })
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.log(error)
      })
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