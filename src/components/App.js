import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import Foundation from 'react-foundation'
import $ from 'jquery'
import Search from './Search.js'
import MainDate from './Date.js'
import News from './News.js'
import Add from './Add.js'
import Weather from './Weather.js'
import Github from './Github.js'
import Docs from './Docs.js'
import Share from './Share.js'
import Ticker from './Ticker.js'

class App extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount = () => {
    this.changeBackground()
    setTimeout(function() {
      $('.overlay').fadeOut(200)
    }, 30)

    setTimeout(function() {
      $('.overlay').hide()
    }, 1000)
  }

  changeBackground = () => {
    const today = new Date()
    const todayNum = today.getDate()
    $('.bg_image').css({
      'background-image': `url(src/assets/bg_photos/${todayNum}.jpg)`
    })
  }

  render = () => {
    return (
      <div className="application">
        <div className="bg_image">
          <div className="underlay" />
          {/* <Add/>*/}
          <Share />
          <MainDate />
          <Search />
          <News />
          <Weather />
          <Docs />
          <Github />
          <Ticker/>
        </div>
      </div>
    )
  }
}


export default App
