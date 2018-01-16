import React, { Component } from 'react'
import $ from 'jquery'
import { Row, Column } from 'react-foundation'
import Foundation from 'react-foundation'

class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      local: false,
      entered: false,
      location: null,
      metric: 'F',
      name: null,
      temp: null,
      icon: null,
      current: '',
      locationInput: null
    }
  }

  componentDidMount = () => {
    let self = this
    this.handleLocalData()
  }

  handleLocalData = () => {
    if (localStorage.location) {
      this.getWeather(localStorage.location)
    } else {
      this.locationTest()
    }
  }

  locationTest = () => {
    let self = this
    console.log('location test')
    let loc = null
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function success(pos) {
      let crd = pos.coords
      let latitude = crd.latitude
      let longitude = crd.longitude

      $.getJSON(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`,
        function(data) {
          console.log('weather data', data)
          loc = data.results[2].address_components[0].long_name
          self.setState({ location: loc })
          self.getWeather(self.state.location)
          localStorage.location = self.state.location
        }
      )
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  getWeather = location => {
    let self = this
    $.getJSON(
      'http://api.openweathermap.org/data/2.5/weather?&APPID=6cdaac4949dc28cbd357bc03b8771c11',
      {
        units: 'imperial',
        q: location,
        mode: 'JSON'
      },
      function(response) {
        let locationName = response.name
        let current = response.weather[0].description
        let temp = response.main.temp
        let icon = response.weather[0].icon
        let split = temp.toString().split('')
        split.splice(split.indexOf('.'), split.length)
        temp = parseInt(split.join(''))

        self.setState({
          current: current,
          name: locationName,
          temp: temp + ' °',
          icon: `http://openweathermap.org/img/w/${icon}.png`,
          entered: true
        })
      }
    )
  }

  handleData = e => {
    let input_value = this.state.locationInput
    if (e.key === 'Enter') {
      this.setState({ location: input_value }, function() {
        localStorage.location = this.state.location
        this.getWeather(this.state.location)
      })
    }
  }

  toggleTemp = () => {
    if (this.state.metric !== 'C') {
      let split = this.state.temp.split('')
      split.splice((split.length - 2, 2))
      let temp = parseInt(split.join(''))
      let cel = (temp - 32) / 1.8
      cel = parseInt(cel.toFixed(4))
      this.setState({
        metric: 'C',
        temp: cel + ' °'
      })
    } else {
      let split = this.state.temp.split('')
      split.splice((split.length - 2, 2))
      let temp = parseInt(split.join(''))
      let far = temp * 1.8 + 33
      far = parseInt(far.toFixed(4))
      this.setState({
        metric: 'F',
        temp: far + ' °'
      })
    }
  }

  clearState = () => {
    this.setState({
      entered: false,
      location: null,
      name: null,
      temp: null,
      current: ''
    })
  }

  locationInputUpdate = e => {
    this.setState({ locationInput: e.target.value })
  }

  render = () => {
    if (!this.state.entered) {
      return (
        <div className="weather_component">
          <Column large={12}>
            <input
              type="text"
              placeholder="enter your location"
              className="weather_input"
              onChange={this.locationInputUpdate}
              onKeyPress={this.handleData}
            />
          </Column>
        </div>
      )
    } else {
      return (
        <div className="weather_component">
          <Column large={12}>
            <h5>{this.state.name}</h5>
            <h5>{this.state.current}</h5>
            <img src={this.state.icon} alt="weather_icon" />
            <h5 onDoubleClick={this.toggleTemp}>{this.state.temp}</h5>
            <p
              className="title"
              onClick={this.clearState}
              style={{ cursor: 'pointer' }}
            >
              Change {<br />}Location
            </p>
          </Column>
        </div>
      )
    }
  }
}

export default Weather
