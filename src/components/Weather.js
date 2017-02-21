import React, { Component } from 'react';
import $ from 'jQuery';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';

class Weather extends Component {
	constructor(props) {
		super(props);

		this.Get = this.Get.bind(this);
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
		var self = this;
		// console.log('weather mounted');
		this.handleLocalData();
	}
	handleLocalData(){
		if (localStorage.location !== undefined){
			// console.log('local location exists', localStorage.location);
			this.Get(localStorage.location);
		}
	}

	Get(location){
		let self = this;
		// console.log('weather get');
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?&APPID=6cdaac4949dc28cbd357bc03b8771c11', {
	        	units: "imperial",
		        q: location,
		        mode: 'JSON'
		    },
		    function(response) {
		    	// console.log(response);
		    	let locationName = response.name;
		    	let current = response.weather[0].description;
		    	let temp = response.main.temp;
		    	let icon = response.weather[0].icon;

		        self.setState({'current': current}, function(){
		        	self.setState({'name': locationName}, function(){
		        		self.setState({'temp': temp +' °'}, function(){
		        			self.setState({'icon': "http://openweathermap.org/img/w/"+ icon +".png"}, function(){
		        				// console.log('icon:', this.state.icon);
		        				self.setState({entered: true});
		        			});
		        		});
		        	});
		        	
		        });

		});
		
	}

	handleData(e){
		var input_value = document.querySelector('.weather_input').value;
		if (e.key === 'Enter'){
			this.setState({location: input_value}, function(){
				// console.log(this.state.location);
				localStorage.location = this.state.location;
				// console.log('local location', localStorage.location);
				this.Get(this.state.location);
			});
		}
	}

	clearState(){
		// console.log('clearState');
		this.setState({
			'entered': false,
			'location': null,
			'name': null,
			'temp': null,
			'current': ''
		});
	}

	render(){
		if (this.state.entered === false){
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