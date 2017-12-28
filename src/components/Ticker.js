import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import io from 'socket.io-client'
import $ from 'jquery'
const socket = io('https://coincap.io')

class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      on: false,
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
    this.socketsOn()
  }

  socketsOn = () => {
    let self = this
    if (this.state.on) {
      // console.log('socket on')
      socket.open()
      socket.on('trades', tradeMsg => {
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
          switch (tradeMsg.coin) {
            case 'BTC':
              self.setState({
                BTC: Number(tradeMsg.message.msg.price).toFixed(2)
              })
              break
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
            case 'BCH':
              self.setState({
                BCH: Number(tradeMsg.message.msg.price).toFixed(2)
              })
              break
          }
        }
      })
    } else {
      socket.close()
      // console.log('socket closed')
    }
  }

  handleClick = () => {
    console.log('handleClick')
    let self = this
    this.setState({ on: !this.state.on }, () => {
      self.socketsOn()
    })
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

  render = () => {
    if (this.state.on) {
      return <div className='ticker'>
          <ul>
            <li>
              <img src='src/assets/up_trend.svg' onClick={this.handleClick} />
            </li>
            <li>
              <a href='http://coincap.io/BTC' target='blank_'>
                <span className='coin'>BTC</span>
              </a>: {this.state.BTC}
            </li>
            <li>
              <a href='http://coincap.io/LTC' target='blank_'>
                <span className='coin'>LTC</span>
              </a>: {this.state.LTC}
            </li>
            <li>
              <a href='http://coincap.io/ETH' target='blank_'>
                <span className='coin'>ETH</span>
              </a>: {this.state.ETH}
            </li>
            <li>
              <a href='http://coincap.io/BCH' target='blank_'>
                <span className='coin'>BCH</span>
              </a>: {this.state.BCH}
            </li>
          </ul>
        </div>
    } else {
      return (
        <div className='ticker'>
          <ul>
            <li>
              <img
                title='Cryptocurrency Tickers'
                src='src/assets/up_trend.svg'
                onClick={this.handleClick}
              />
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default Ticker
