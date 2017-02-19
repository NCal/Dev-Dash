import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';

import docs_data from '../data/docs_data.js';


class Docs_search extends Component {
	constructor(props){
		super(props);
		this.handleInput =this.handleInput.bind(this);
		this.state = {
			name: 'docs_search',
			add_state: false
		}
	}

	componentDidMount(){
		console.log('Docs Search mounted');
	}
	onEdit(e){
		let search = e;
		console.log(e);
	
		for (let i = 0; i< docs_data.length; i++){
			if ( docs_data[i].name.toLowerCase().indexOf(search.toLowerCase()) === -1){
				$('.doc_bloc img[title="'+docs_data[i].name+'"]').parent().hide();
			}  else {
				$('.doc_bloc img[title="'+docs_data[i].name+'"]').parent().show();
			}
		}
	}

	handleInput(e){
		let search = e.target.value;
		this.onEdit(search);

	}

	render(){
		if (!this.state.add_state){
			return (<div>
				<input type="text" className="docs_search_input" placeholder="search" onChange={this.handleInput}/>
			</div>)
		} else {
			return (<div>
				<div>+</div>
				<input type="text" className="docs_search_input" placeholder="search" onChange={this.handleInput}/>
			</div>)
		}
		
	}
}


class Docs extends Component {
	constructor(props){
		super(props);
		this.Toggle =this.Toggle.bind(this);
		
		this.state = {
			on: false
		};
	}

	componentDidMount(){
		console.log('Docs mounted');
	}

	Toggle(){
		if (this.state.on === false){
			this.setState({on: true});
		}
		else {
			this.setState({on: false});
		}
	}

	render(){

		if (this.state.on ===true){
			return (
				<div className="docs_component">
					<p style={{cursor: 'pointer'}} onClick={this.Toggle}>Hide</p>
					<Docs_search/>
					<div className="inner_scroll">
						{docs_data.map(function(thang, i){
							return <a key={i} style={{color: '#fff'}} href={thang.url}><Column large={3} className="doc_bloc">
								<img className="doc_logo" title={thang.name} src={thang.logo}/>
							</Column></a>
						})}
					</div>
				</div>
				)
		} else {
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