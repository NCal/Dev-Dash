import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';
class Main_Date extends Component {
	constructor(props) {
		super(props);

			this.startTime = this.startTime.bind(this);
			this.checkTime = this.checkTime.bind(this);
		
		this.state = {
			time: '',
			date: ''
		};
	}

	componentDidMount() {
		console.log('Date mounted');
		this.startTime();
	}

 	startTime() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
		// console.log(h);

		if (h >= 13 ){h = h - 12}
		if (h === 0 || h === 24 || h === -12 ){ h= 12; }

	    m = this.checkTime(m);
		this.setState({ time: h + ":" + m});
		this.setState({ date: today.toDateString() });
	    var t = setTimeout(this.startTime, 500);
}

 	checkTime(i) {
	    if (i < 10) {i = "0" + i };  // add zero in front of numbers < 10
	    return i;
	}
	handleMouseOver(){
		$('.time').animate({'letter-spacing': '0.3em'}, 200);
	}
	handleMouseLeave(){
		$('.time').animate({'letter-spacing': '0em'}, 200);

	}
	render(){
		return (<div>
				<Column  small={8} medium={8} large={3} centerOnSmall centerOnLarge centerOnMedium >
					
					<h1  className="time" style={{textAlign: 'center'}} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>{this.state.time}</h1>
					<p style={{textAlign: 'center'}}>{this.state.date}</p>
				</Column>
		</div>)
	}
}

Date.defaultProps = {
	name: 'Date'
};

export default Main_Date;