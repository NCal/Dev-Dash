import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';


let data = [
		{symbol: 'R', logo: 'src/assets/docs_logos/react.png', name: 'React', url: 'https://facebook.github.io/react/docs/hello-world.html'},
		{symbol: 'JS', logo: 'src/assets/docs_logos/javascript.png', name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
		{symbol: 'CSS', logo: 'src/assets/docs_logos/css.png', name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'},
		{symbol: 'jQ', logo: 'src/assets/docs_logos/jquery.png', name: 'Jquery', url: 'http://api.jquery.com/'},
		{symbol: 'RB', logo: 'src/assets/docs_logos/ruby.png', name: 'Ruby', url: 'http://ruby-doc.org/'},
		{symbol: 'PHP', logo: 'src/assets/docs_logos/php.png', name: 'PHP', url: 'http://php.net/docs.php'},
		{symbol: 'A', logo: 'src/assets/docs_logos/angular.png', name: 'Angular', url: 'https://docs.angularjs.org/api'},
		{symbol: 'R', logo: 'src/assets/docs_logos/rails.png', name: 'Ruby on Rails', url: 'http://api.rubyonrails.org/'},
		{symbol: 'ND', logo: 'src/assets/docs_logos/node.png', name: 'Node', url: 'https://nodejs.org/api/'},
		{symbol: 'B', logo: 'src/assets/docs_logos/bootstrap.png', name: 'Bootstrap', url: 'http://getbootstrap.com/'},
		{symbol: 'F', logo: 'src/assets/docs_logos/foundation.png', name: 'Foundation', url: 'http://foundation.zurb.com/sites/docs/'},
		{symbol: 'NPM', logo: 'src/assets/docs_logos/npm.png', name: 'NPM', url: 'https://www.npmjs.com/'},
		{symbol: 'W', logo: 'src/assets/docs_logos/webpack.png', name: 'Webpack', url: 'http://webpack.github.io/docs/'},

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
				$('.doc_bloc img[title="'+data[i].name+'"]').parent().hide();
			}  else {
				$('.doc_bloc img[title="'+data[i].name+'"]').parent().show();
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
				<input type="text" className="docs_search_input" placeholder="search" onChange={this.handleInput}/>
				<div className="inner_scroll">
				
				{data.map(function(thang, i){
					return <a key={i} style={{color: '#fff'}} href={thang.url}><Column large={3} className="doc_bloc">
						{/*<h5 title={thang.name}>{thang.symbol}</h5>*/}
						<img className="doc_logo" title={thang.name} src={thang.logo}/>
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