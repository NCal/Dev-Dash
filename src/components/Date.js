import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';
class MainDate extends Component {
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
    this.startTime();
  }

   startTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();

	 	if (h >= 13 ){h = h - 12}
	 	if (h === 0 || h === 24 || h === -12 ){ h= 12; }

  		m = this.checkTime(m);
 		this.setState({ time: h + ":" + m});
 		this.setState({ date: today.toDateString() });
   	let t = setTimeout(this.startTime, 500);
	}

   checkTime(i) {
      if (i < 10) {i = "0" + i };
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

export default MainDate;