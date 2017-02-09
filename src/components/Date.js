import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';

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

		if (h === 13){ h= 1; }
		if (h === 14){ h= 2; }
		if (h === 15){ h= 3; }
		if (h === 16){ h= 4; }
		if (h === 17){ h= 5; }
		if (h === 18){ h= 6; }
		if (h === 19){ h= 7; }
		if (h === 20){ h= 8; }
		if (h === 21){ h= 9; }
		if (h === 22){ h= 10; }
		if (h === 23){ h= 11; }
		if (h === 0 || h === 24){ h= 12; }

	    m = this.checkTime(m);
		this.setState({ time: h + ":" + m});
		this.setState({ date: today.toDateString() });
	    var t = setTimeout(this.startTime, 500);
}

 	checkTime(i) {
	    if (i < 10) {i = "0" + i };  // add zero in front of numbers < 10
	    return i;
	}
	render(){
		return (<div>
				<Column  small={8} medium={8} large={8} centerOnSmall centerOnLarge centerOnMedium >
					
					<h1  className="time" style={{textAlign: 'center'}}>{this.state.time}</h1>
					<p style={{textAlign: 'center'}}>{this.state.date}</p>
				</Column>
		</div>)
	}
}

Date.defaultProps = {
	name: 'Date'
};

export default Main_Date;