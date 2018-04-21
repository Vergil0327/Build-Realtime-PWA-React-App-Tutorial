import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import './History.scss'

export default class History extends Component {
  state = {
    todayPrice: {},
    yesterdayPrice: {},
    twoDaysPrice: {},
    threeDaysPrice: {},
    fourDaysPrice: {},
  }

  componentDidMount() {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDaysPrice();
    this.getFourDaysPrice();
  }

  // Functions to get the ETH, BTC, LTC price for a specific timestamp/date.
  // The date is passed in as an argument
  getETHPrices = (date) => axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
  getBTCPrices = (date) => axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
  getLTCPrices = (date) => axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
  getTodayPrice = () => {
    const today = moment().unix()

    // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
    axios.all([this.getETHPrices(today), this.getBTCPrices(today), this.getLTCPrices(today)])
      .then(axios.spread((eth, btc, ltc) => {
        const todayPrice = {
          date: moment.unix(today).format('MMMM Do YYYY'),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD,
        }

        this.setState({ todayPrice })
      }))
  }

  getYesterdayPrice = () => {
    const yesterday = moment().subtract(1, 'days').unix()
    axios.all([this.getETHPrices(yesterday), this.getBTCPrices(yesterday), this.getLTCPrices(yesterday)])
      .then(axios.spread((eth, btc, ltc) => {
        const yesterdayPrice = {
          date: moment.unix(yesterday).format('MMMM Do YYYY'),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD,
        }

        this.setState({ yesterdayPrice })
      }))
  }

  getTwoDaysPrice = () => {
    const twoDaysAgo = moment().subtract(2, 'days').unix()
    axios.all([this.getETHPrices(twoDaysAgo), this.getBTCPrices(twoDaysAgo), this.getLTCPrices(twoDaysAgo)])
      .then(axios.spread((eth, btc, ltc) => {
        const twoDaysPrice = {
          date: moment.unix(twoDaysAgo).format('MMMM Do YYYY'),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD,
        }

        this.setState({ twoDaysPrice })
      }))
  }

  getThreeDaysPrice = () => {
    const threeDaysAgo = moment().subtract(3, 'days').unix()
    axios.all([this.getETHPrices(threeDaysAgo), this.getBTCPrices(threeDaysAgo), this.getLTCPrices(threeDaysAgo)])
      .then(axios.spread((eth, btc, ltc) => {
        const threeDaysPrice = {
          date: moment.unix(threeDaysAgo).format('MMMM Do YYYY'),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD,
        }

        this.setState({ threeDaysPrice })
      }))
  }

  getFourDaysPrice = () => {
    const fourDaysAgo = moment().subtract(4, 'days').unix()
    axios.all([this.getETHPrices(fourDaysAgo), this.getBTCPrices(fourDaysAgo), this.getLTCPrices(fourDaysAgo)])
      .then(axios.spread((eth, btc, ltc) => {

        const fourDaysPrice = {
          date: moment.unix(fourDaysAgo).format('MMMM Do YYYY'),
          eth: eth.data.ETH.USD,
          btc: btc.data.BTC.USD,
          ltc: ltc.data.LTC.USD,
        }

        this.setState({ fourDaysPrice })
      }))
  }

  render() {
    return (
        <div className="history--section container">
            <h2>History (Past 5 days)</h2>
            <div className="history--section__box">
                <div className="history--section__box__inner">
                    <h4>{this.state.todayPrice && this.state.todayPrice.date}</h4>
                    <div className="columns">
                        <div className="column">
                            <p>1 BTC = ${this.state.todayPrice && this.state.todayPrice.btc}</p>
                        </div>
                        <div className="column">
                            <p>1 ETH = ${this.state.todayPrice && this.state.todayPrice.eth}</p>
                        </div>
                        <div className="column">
                            <p>1 LTC = ${this.state.todayPrice && this.state.todayPrice.ltc}</p>
                        </div>
                    </div>
                </div>
                <div className="history--section__box__inner">
                    <h4>{this.state.yesterdayPrice && this.state.yesterdayPrice.date}</h4>
                    <div className="columns">
                        <div className="column">
                            <p>1 BTC = ${this.state.yesterdayPrice && this.state.yesterdayPrice.btc}</p>
                        </div>
                        <div className="column">
                            <p>1 ETH = ${this.state.yesterdayPrice && this.state.yesterdayPrice.eth}</p>
                        </div>
                        <div className="column">
                            <p>1 LTC = ${this.state.yesterdayPrice && this.state.yesterdayPrice.ltc}</p>
                        </div>
                    </div>
                </div>
                <div className="history--section__box__inner">
                    <h4>{this.state.twoDaysPrice && this.state.twoDaysPrice.date}</h4>
                    <div className="columns">
                        <div className="column">
                            <p>1 BTC = ${this.state.twoDaysPrice && this.state.twoDaysPrice.btc}</p>
                        </div>
                        <div className="column">
                            <p>1 ETH = ${this.state.twoDaysPrice && this.state.twoDaysPrice.eth}</p>
                        </div>
                        <div className="column">
                            <p>1 LTC = ${this.state.twoDaysPrice && this.state.twoDaysPrice.ltc}</p>
                        </div>
                    </div>
                </div>
                <div className="history--section__box__inner">
                    <h4>{this.state.threeDaysPrice && this.state.threeDaysPrice.date}</h4>
                    <div className="columns">
                        <div className="column">
                            <p>1 BTC = ${this.state.threeDaysPrice && this.state.threeDaysPrice.btc}</p>
                        </div>
                        <div className="column">
                            <p>1 ETH = ${this.state.threeDaysPrice && this.state.threeDaysPrice.eth}</p>
                        </div>
                        <div className="column">
                            <p>1 LTC = ${this.state.threeDaysPrice && this.state.threeDaysPrice.ltc}</p>
                        </div>
                    </div>
                </div>
                <div className="history--section__box__inner">
                    <h4>{this.state.fourDaysPrice && this.state.fourDaysPrice.date}</h4>
                    <div className="columns">
                        <div className="column">
                            <p>1 BTC = ${this.state.fourDaysPrice && this.state.fourDaysPrice.btc}</p>
                        </div>
                        <div className="column">
                            <p>1 ETH = ${this.state.fourDaysPrice && this.state.fourDaysPrice.eth}</p>
                        </div>
                        <div className="column">
                            <p>1 LTC = ${this.state.fourDaysPrice && this.state.fourDaysPrice.ltc}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      )
    }
}