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
		// console.log(e.target.type);
		// console.log(e.target);

		if (e.target.type=== 'radio'){
			console.log('radio');
			let clicked_box = e.target;

				for (let i=0;i<$('input.search_option').length; i++){
					$('input.search_option')[i].checked =false;
				}

			clicked_box.checked = true;
			this.setState({search: clicked_box.name});
		}

		else {
			console.log('not radio');
			let clicked_box = e.target.getAttribute('name');
			console.log('clicked box',clicked_box);
			this.setState({search: clicked_box});
			let self = this;
				setTimeout(function(){
					if (self.state.search === 'google'){
						for (let i=0;i<$('input.search_option').length; i++){
							$('input.search_option')[i].checked =false;
						}
						document.querySelector('.google_input').checked =true;
					}

					if (self.state.search === 'stack'){
						for (let i=0;i<$('input.search_option').length; i++){
							$('input.search_option')[i].checked =false;
						}
						document.querySelector('.stack_input').checked =true;
					}

					if (self.state.search === 'github'){
						for (let i=0;i<$('input.search_option').length; i++){
							$('input.search_option')[i].checked =false;
						}
						document.querySelector('.github_input').checked =true;
					}
				},10);
				
		}
		
	}
	render() {
			return (<div className="search">
					<Column  small={8} medium={8} large={8} centerOnSmall centerOnLarge centerOnMedium >
						<input type="text"  placeholder="search" className="search_input" onKeyDown={this.Handle_keypress}/>
						<div className="option_container" style={{textAlign: 'center'}}>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option google_input" type="radio" name="google" onClick={this.Handle_check} defaultChecked/><span style={{cursor: 'pointer'}} type="span" name="google" onClick={this.Handle_check} className="search_option_span google">Google</span>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option stack_input" type="radio" name="stack" onClick={this.Handle_check} /><span style={{cursor: 'pointer'}} type="span"  name="stack" onClick={this.Handle_check}  className="search_option_span stack">Stack Overflow</span>
							<input style={{textAlign: 'center', cursor: 'pointer'}} className="search_option github_input" type="radio" name="github" onClick={this.Handle_check} /><span  style={{cursor: 'pointer'}} type="span"  name="github" onClick={this.Handle_check} className="search_option_span github">Github</span>
						</div>
					</Column>
			</div>)
	}
}


Search.defaultProps = {

}

export default Search;