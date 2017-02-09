import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';


let Search_urls = [{name: 'google' },{name: 'stack'},{name: 'github'}];

class Search extends Component{
	constructor(props) {
		super(props);
		this.Handle_check = this.Handle_check.bind(this);
		this.Handle_keypress = this.Handle_keypress.bind(this);
		this.state = {
			search: 'google',
		};
	}
	componentDidMount() {
		// console.log('search mounted');
	}
	Handle_keypress(e){
		let input = document.querySelector('.search_input');
		if (e.key === 'Enter' && this.state.search === "google"){
			let search = input.value;
			window.location = 'https://www.google.com/search?q=' + search;
		} 
		if (e.key === 'Enter' && this.state.search === "stack"){
			let search = input.value;
			window.location = 'https://www.stackoverflow.com//search?q=' + search;
		}
		if (e.key === 'Enter' && this.state.search === "github"){
			let search = input.value;
			window.location = 'https://www.github.com/search?utf8=%E2%9C%93&q=' + search;
		}
	}
	Handle_check(e){
		console.log(e.target.type);
		console.log(e.target);

		if (e.target.type= 'radio'){
			let clicked_box = e.target;

				for (let i=0;i<$('input.search_option').length; i++){
					$('input.search_option')[i].checked =false;
				}

			clicked_box.checked = true;
			this.setState({search: clicked_box.name});
		}

		else {
			
		}
		
	}
	render() {
			return (<div className="search">
					<Column  small={8} medium={8} large={8} centerOnSmall centerOnLarge centerOnMedium >
						<input type="text"  placeholder="search" className="search_input" onKeyDown={this.Handle_keypress}/>
						<div className="option_container" style={{textAlign: 'center'}}>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option " type="radio" name="google" onClick={this.Handle_check} defaultChecked/><span type="span" className="search_option_span google">Google</span>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option " type="radio" name="stack" onClick={this.Handle_check} /><span type="span" className="search_option_span stack">Stack Overflow</span>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option " type="radio" name="github" onClick={this.Handle_check} /><span type="span" className="search_option_span github">Github</span>
						</div>
					</Column>
			</div>)
	}
}


Search.defaultProps = {

}

export default Search;