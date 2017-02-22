import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';
import DocsSearch from './DocsSearch.js';
import docsData from '../data/docsData.js';

class Docs extends Component {
   constructor(props){
      super(props);
      this.toggleOn =this.toggleOn.bind(this);
      this.addDoc = this.addDoc.bind(this);
      this.saveInput = this.saveInput.bind(this);
      
      this.state = {
         mode: 'off',
         docInput: null
      };
   }

   toggleOn(){
   	if (this.state.mode === 'off'){
   		this.setState({mode: 'on'});
   	} else {
   		this.setState({mode: 'off'});
   	}
   }

   addDoc(){
   	console.log('add doc');
   	this.setState({
   		mode: 'add'});
   }

   handleInput(e){
   	let input = e.target.value;
   }

   saveInput(){
   	let titleInput = document.getElementsByClassName('addTitleInput')[0];
   	let linkInput = document.getElementsByClassName('addLinkInput')[0];
   	if (titleInput.value !== '' && linkInput.value !== ''){
   		console.log(titleInput.value);
   		// this.setState({docInput: textbox.value});
   		docsData.unshift({symbol: ''+titleInput.value[0].toUpperCase()+'', logo: 'src/assets/docs_logos/grey/add.png', name: ''+titleInput.value+'', url: 'http://'+linkInput.value+'', type:'added'});
   	}
   	console.log('save input');

   	this.setState({mode: 'on'});
   }

   render(){
      if (this.state.mode ==='on'){
         return (
            <div className="docs_component">
               <p style={{cursor: 'pointer'}} onClick={this.toggleOn}>Hide</p>
               <DocsSearch/>
               <div className="inner_scroll">
            		<Column large={3} className="doc_bloc" style={{cursor: 'pointer'}} onClick={this.addDoc}>
                     <img className="doc_logo" title="add" src="src/assets/docs_logos/grey/add.png"/>
                  </Column>
                 {docsData.map(function(thang, i){
                 	if (thang.type ==="added" ){
                 		return <a key={i} style={{color: '#fff'}} href={thang.url}><Column large={3} className="doc_bloc">
                 		   <h3 title={thang.name}>{thang.symbol}</h3>
                 		</Column></a>
                 	} else{
                 		return <a key={i} style={{color: '#fff'}} href={thang.url}><Column large={3} className="doc_bloc">
                 		   <img className="doc_logo" title={thang.name} src={thang.logo}/>
                 		</Column></a>
                 	}
                     
                  })} 
               </div>
            </div>
            )
      }  if (this.state.mode === 'off'){
         return (<div className="docs_off_component" onClick={this.toggleOn}>
            <p>Docs +</p>
         </div>)
      }  if (this.state.mode === 'add'){
      	return (
      		<div className="docs_component">
      		   <p style={{'cursor': 'pointer'}} onClick={this.toggleOn}>Hide</p>
      		   <input className="addTitleInput" type="text" onKeyPress={this.handleInput} placeholder="Name"/>
      		   <input className="addLinkInput" type="text" onKeyPress={this.handleInput} placeholder="Link"/>
      		   <div style={{'color':'#fff', 'cursor': 'pointer'}} onClick={this.saveInput}>save</div>
      		</div>
   		)
      }
   }
}

Docs.defaultProps = {
   name: 'Docs'
};

export default Docs;