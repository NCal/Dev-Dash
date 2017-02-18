import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';


let data = [
		{symbol: 'R', name: 'React', url: 'https://facebook.github.io/react/docs/hello-world.html'},
		{symbol: 'JS', name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
		{symbol: 'CSS', name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'},
		{symbol: 'jQ', name: 'Jquery', url: 'http://api.jquery.com/'},
		{symbol: 'RB', name: 'Ruby', url: 'http://ruby-doc.org/'},
		{symbol: 'PHP', name: 'PHP', url: 'http://php.net/docs.php'},
		{symbol: 'A', name: 'Angular', url: 'https://docs.angularjs.org/api'},
		{symbol: 'R', name: 'Rails', url: 'http://api.rubyonrails.org/'},
		{symbol: 'ND', name: 'Node', url: 'https://nodejs.org/api/'},
		{symbol: 'B', name: 'Bootstrap', url: 'http://getbootstrap.com/'},
		{symbol: 'F', name: 'Foundation', url: 'http://foundation.zurb.com/sites/docs/'},
		{symbol: 'NPM', name: 'NPM', url: 'https://www.npmjs.com/'},
		{symbol: 'W', name: 'Webpack', url: 'http://webpack.github.io/docs/'},
];

class Docs extends Component {
	constructor(props){
		super(props);
		this.Toggle =this.Toggle.bind(this);
		this.handleInput =this.handleInput.bind(this);
		this.state = {
			name: 'D',
			on: false
		};
	}

	componentDidMount(){
		console.log('Docs mounted');
	}

	Toggle(){
		if (this.state.on === false){
			console.log('its false');
			this.setState({on: true});
		}
		else {
				console.log('its true');
			this.setState({on: false});
		}
	}
	onEdit(e){
		let search = e;
		console.log(e);
	
		for (let i = 0; i< data.length; i++){

			if ( data[i].name.toLowerCase().indexOf(search.toLowerCase()) === -1){
				$('.doc_bloc h5[title="'+data[i].name+'"]').hide();
			}  else {
				$('.doc_bloc h5[title="'+data[i].name+'"]').show();
			}
		}
	}

	handleInput(e){
		let search = e.target.value;
		this.onEdit(search);

	}
	render(){

		if (this.state.on ===true){
			return (
				<div className="docs_component">
				<p style={{cursor: 'pointer'}} onClick={this.Toggle}>Hide</p>
				<input type="text" className="docs_search_input" onChange={this.handleInput}/>
				<div className="inner_scroll">
				
				{data.map(function(thang, i){
					return <a key={i} style={{color: '#fff'}} href={thang.url}><Column large={3} className="doc_bloc">
						<h5 title={thang.name}>{thang.symbol}</h5>
					</Column></a>
				})}
	
				</div>
				</div>
				)
		}
		else {
			return (<div className="docs_off_component" onClick={this.Toggle}>
				<p>Docs +</p>
			</div>)
		}
		
	
	}
}

Docs.defaultProps = {
	name: 'Docs'
};

export default Docs;