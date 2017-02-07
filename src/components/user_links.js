import React, { Component } from 'react';
import $ from 'jQuery';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
let Links =  [];


class User_Links extends Component{
	constructor(props) {
		super(props);
		this.Handle_keypress = this.Handle_keypress.bind(this);
		this.Save_link = this.Save_link.bind(this);
		this.Add_link = this.Add_link.bind(this);
		this.state = {
			button: true,

		};
	}
	componentDidMount() {
		// console.log('hello');
	}
	Add_link() {
		this.setState({button: false});

	}
	Save_link() {
		// console.log('save link');
		let input = document.querySelector('.url_input');
		console.log(input.value);
		let split = input.value.split('');
		if (split.filter(function(thang){return thang !== ' ';}).length === 0) {
			// console.log('hi');
		}


		else if (input.value !==""){
			Links.push({Url: 'http://'+input.value});
		}
		// console.log(''Links);
		this.setState({button: true});


	}
	Handle_keypress(e){
		if (e.key == 'Enter'){
			this.Save_link();
		}
	}
	render() {
		if (this.state.button === true ) {
			return (<div>
					<button onClick={this.Add_link} className="add_link_button button">+</button>
						<div className="user_links_container">
							{Links.map(function(thang, i){
								return <a href={thang.Url} key={i}><p className="link_p">{thang.Url}</p></a>
							})}
						</div>		
			</div>)
		}
		else {
			return (<div>
					<input className="url_input"  type="url" placeholder="Enter a link" onKeyPress={this.Handle_keypress} />
					<button onClick={this.Save_link} className="save_link_button button">Save</button>
			</div>)
		}
		
	}
}


User_Links.defaultProps = {

}

export default User_Links;