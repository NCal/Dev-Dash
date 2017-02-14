import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';

let Search_urls = [{name: 'google' },{name: 'stackoverflow'},{name: 'github'}];

let input_styles = {textAlign: 'center', cursor: 'pointer'};

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
		let search = input.value; 

		for (let i=0; i < document.getElementsByClassName('search_option').length; i++){
				if (e.key === 'Enter' && this.state.search === document.getElementsByClassName('search_option')[i].name){
					window.location = 'https://www.'+this.state.search+'.com/search?q=' + search;
				} 
		}
	}
	Handle_check(e){
		let search_option = document.getElementsByClassName('search_option');

		if (e.target.type=== 'radio'){
			let clicked_box = e.target;
			// uncheck all buttons
			for (let i=0; i < search_option.length; i++){
				search_option[i].checked =false;
			}

			clicked_box.checked = true;
			this.setState({search: clicked_box.name});
		}

		else {
			let clicked_box = e.target.getAttribute('name');
			let self = this;

			this.setState({search: clicked_box});
				setTimeout(function(){
					for (let i=0;i< search_option.length; i++){
						search_option[i].checked =false;
						
						if (self.state.search === search_option[i].name){
							document.querySelector('.'+search_option[i].name+'_input').checked = true;
						}
					}
				},10);
		}
	}
	render() {
			return (<div className="search">
					<Column  small={8} medium={8} large={4} centerOnSmall centerOnLarge centerOnMedium >
						<input type="text"  placeholder="search" className="search_input" onKeyDown={this.Handle_keypress}/>
						<div className="option_container" style={{textAlign: 'center'}}>
							<input style={input_styles} className="search_option google_input" type="radio" name="google" onClick={this.Handle_check} defaultChecked/><span style={{cursor: 'pointer'}} type="span" name="google" onClick={this.Handle_check} className="search_option_span google">Google</span>
							<input style={input_styles} className="search_option stackoverflow_input" type="radio" name="stackoverflow" onClick={this.Handle_check} /><span style={{cursor: 'pointer'}} type="span"  name="stackoverflow" onClick={this.Handle_check}  className="search_option_span stackoverflow">Stack Overflow</span>
							<input style={input_styles} className="search_option github_input" type="radio" name="github" onClick={this.Handle_check} /><span  style={{cursor: 'pointer'}} type="span"  name="github" onClick={this.Handle_check} className="search_option_span github">Github</span>
						</div>
					</Column>
			</div>)
	}
}


Search.defaultProps = {

}

export default Search;