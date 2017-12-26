import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import $ from 'jquery'
class MainDate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      time: null,
      date: null
    }
  }

  componentDidMount = () => {
    this.startTime()
  }

  startTime = () => {
    const today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()

    if (h >= 13) {
      h = h - 12
    }
    if (h === 0 || h === 24 || h === -12) {
      h = 12
    }

    m = this.checkTime(m)
    this.setState({ time: h + ':' + m })
    this.setState({ date: today.toDateString() })
    const t = setTimeout(this.startTime, 500)
  }

  checkTime = i => {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  handleMouseOver = e => {
    let targ = e.target.className
    $(`.${targ}`).animate({ 'letter-spacing': '0.3em' }, 150)
  }

  handleMouseLeave = e => {
    let targ = e.target.className
    $(`.${targ}`).animate({ 'letter-spacing': '0em' }, 150)
  }

  render = () => {
    return (
      <div className="date">
        <Column
          small={8}
          medium={8}
          large={3}
          centerOnSmall
          centerOnLarge
          centerOnMedium
        >
          <h1
            className="time"
            style={{ textAlign: 'center' }}
            onMouseOver={e => this.handleMouseOver(e)}
            onMouseLeave={e => this.handleMouseLeave(e)}
          >
            {this.state.time}
          </h1>
          <p style={{ textAlign: 'center' }}>{this.state.date}</p>
        </Column>
      </div>
    )
  }
}

Date.defaultProps = {
  name: 'Date'
}

export default MainDate
