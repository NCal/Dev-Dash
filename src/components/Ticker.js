import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import io from 'socket.io-client'
import $ from 'jquery'
const socket = io('https://coincap.io')

class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      on: true,
      coin: null,
      BTC: 'loading..',
      LTC: 'loading..',
      ETH: 'loading..',
      BCH: 'loading..'
    }
  }

  componentDidMount = () => {
    let self = this
    // console.log('Ticker')
    this.socketsOn();
  }

  socketsOn = () => {
    let self = this
    // console.log('sockets on')
    socket.on('trades', tradeMsg => {
      // console.log(tradeMsg.market_id.substr(4))
      if (
        tradeMsg.exchange_id === 'bitfinex' &&
        tradeMsg.market_id.substr(4) == 'USD'
      ) {
        // console.log(tradeMsg)
        switch (tradeMsg.coin) {
          case 'BTC':
            self.setState({
              BTC: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
          case 'ETH':
            self.setState({
              ETH: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
          case 'LTC':
            self.setState({
              LTC: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
          case 'BCH':
            self.setState({
              BCH: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
        }
      }
      if (
        tradeMsg.exchange_id === 'kraken' &&
        tradeMsg.market_id.substr(4) == 'USD'
      ) {
        // console.log(tradeMsg)
        switch (tradeMsg.coin) {
          case 'LTC':
            self.setState({
              LTC: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
          case 'ETH':
            self.setState({
              ETH: Number(tradeMsg.message.msg.price).toFixed(2)
            })
            break
        }
      }
    })
  }

  handleClick = () => {
    this.setState({ on: !this.state.on })
    // this.getReq()
  }

  saveInput = e => {
    console.log(e.target.value)
    console.log('save input')
    let coin = e.target.value
    console.log('coin', coin)
    if (e.key === 'Enter' && coin !== '') {
      this.setState({ coin: coin })
      this.getReq(coin)
    }
  }

  turnOn = () => {
    // let self = this
    // console.log('turn on')
    // this.setState({ on: !self.state.on })

    // this.socketsOn()
  }

  render = () => {
    if (this.state.on) {
      return (
        <div className="ticker">
          <ul>
            <li>
              <img src="src/assets/up_trend.svg" />
            </li>
            <li>
              <span className="coin">BTC</span>: {this.state.BTC}
            </li>
            <li>
              <span className="coin">LTC</span>: {this.state.LTC}
            </li>
            <li>
              <span className="coin">ETH</span>: {this.state.ETH}
            </li>
            <li>
              <span className="coin">BCH</span>: {this.state.BCH}
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="ticker">
          <ul>
            <li>
              <img src="src/assets/up_trend.svg" onClick={this.turnOn} />
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default Ticker