import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
// import Foundation from 'react-foundation';

class Search extends Component{
	constructor(props) {
		super(props);
		this.Handle_keypress = this.Handle_keypress.bind(this);
		this.state = {

		};
	}
	componentDidMount() {
		// console.log('search mounted');
	}
	Handle_keypress(e){
		let input = document.querySelector('.search_input');
		if (e.key == 'Enter'){
			let search = input.value;
			window.location = 'https://www.google.com/search?q=' + search;
		}
	}
	Handle_check(e){
		let input = document.querySelector('.search_input');
		if (e.key == 'Enter'){
			let search = input.value;
			window.location = 'https://www.google.com/search?q=' + search;
		}
	}
	render() {
			return (<div className="search">
					<Column  small={8} medium={8} large={8} centerOnSmall centerOnLarge centerOnMedium >
						<input type="text"  placeholder="search" className="search_input" onKeyDown={this.Handle_keypress}/>
						<input className="search_option " type="checkbox" onClick={this.Handle_check} defaultChecked/><span className="search_option_span ">Google</span>
						<input className="search_option " type="checkbox" onClick={this.Handle_check} /><span className="search_option_span ">Stack Overflow</span>
						<input className="search_option " type="checkbox"onClick={this.Handle_check} /><span className="search_option_span ">Github</span>
					</Column>
			</div>)
	}
}


Search.defaultProps = {

}

export default Search;