import React, { Component } from 'react'

class Donate extends Component {
  constructor(props){
    super(props)

    this.state = {
      on: false
    }
  }

  showAddress = () => {
    let self = this;
    // console.log('show address');
    this.setState({on: !self.state.on})
  }
  render = () => {
    if  (!this.state.on) {
      return <div className='donate' title='Donate'>
          <img src='src/assets/donate.png' alt='donate button' onClick={this.showAddress} />
        </div>
    } else {
      return <div className="donate" title="Donate">
          <img src="src/assets/donate.png" alt="donate button" onClick={this.showAddress} />
          <ul className="coin_list">
            <li>
              <span className="coin_header">BTC</span>: 1F9QZkg6Awf6tbk1Fg9V4RNx67MJNHNMjS
            </li>
            <li>
              <span className="coin_header">LTC</span>: LfhEHynTbBb176XE1Pnk2sbn1ZGrECu5Z5
            </li>
            <li>
              <span className="coin_header">ETH</span>: 0x5c85899395d04Bb59E1333b4713a53517243494B
            </li>
            <li>
              <span className="coin_header">Thank you for using Dev-Dash</span> </li>
          </ul>
        </div>
    }
  }
}

export default Donate
