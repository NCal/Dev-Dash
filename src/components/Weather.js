import React, { Component } from 'react';
import $ from 'jQuery';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';

class Weather extends Component {
   constructor(props) {
      super(props);

      this.getWeather = this.getWeather.bind(this);
      this.handleData = this.handleData.bind(this);
      this.clearState = this.clearState.bind(this);

      this.state = {
         local: false,
         entered: false,
         location: null,
         name: null,
         temp: null,
         icon: null,
         current: ''
      };
   }

   componentDidMount(){
      let self = this;
      this.handleLocalData();
   }

   handleLocalData(){
      if (localStorage.location !== undefined){
            this.getWeather(localStorage.location);
      }
   }

   getWeather(location){
      let self = this;
         $.getJSON('http://api.openweathermap.org/data/2.5/weather?&APPID=6cdaac4949dc28cbd357bc03b8771c11', {
               units: "imperial",
               q: location,
               mode: 'JSON'
         }, 
         function(response) {
            let locationName = response.name;
            let current = response.weather[0].description;
            let temp = response.main.temp;
            let icon = response.weather[0].icon;

            self.setState({
               current: current,
               name: locationName,
               temp: temp +' °',
               icon: "http://openweathermap.org/img/w/"+ icon +".png",
               entered: true
            });
      });  
   }

   handleData(e){
      let input_value = document.querySelector('.weather_input').value;
         if (e.key === 'Enter'){
            this.setState({location: input_value}, function(){
               // console.log(this.state.location);
               localStorage.location = this.state.location;
               // console.log('local location', localStorage.location);
               this.getWeather(this.state.location);
            });
         }
   }

   clearState(){
      this.setState({
         'entered': false,
         'location': null,
         'name': null,
         'temp': null,
         'current': ''
      });
   }

   render(){
         if (!this.state.entered){
            return (
               <div className="weather_component">
                  <Column large={12}>
                     <input type="text" placeholder="enter your location" className="weather_input" onKeyPress={this.handleData}/>
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
                     <h5>{this.state.temp}</h5>
                     <p className="title" onClick={this.clearState} style={{cursor: 'pointer'}}>Change {<br/>}Location</p>
                  </Column>
               </div>
            )
      }      
   }
}

export default Weather;