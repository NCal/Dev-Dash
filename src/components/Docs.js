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
      this.subDoc = this.subDoc.bind(this);
      this.saveInput = this.saveInput.bind(this);
      this.handleCustomDocs = this.handleCustomDocs.bind(this);
      
      this.state = {
         mode: 'off',
         docInput: null,
         customDocAmount: 0
      };
   }

   componentDidMount() {
   	this.handleCustomDocs();
   }

   handleCustomDocs(){
   	console.log('handle custom docs');
		if (localStorage.customDocAmount !== undefined){
			let customDocs = JSON.parse(localStorage.customDocs);
			// console.log('we have custom docs here:', customDocs);
			customDocs.forEach(function(doc){
				docsData.unshift(doc);
			});
			// console.log('updated docs data', docsData);
   	}
	}

   toggleOn(){
   	if (this.state.mode === 'off'){
   		this.setState({mode: 'on'});
   	} else {
   		this.setState({mode: 'off'});
   	}
   }

   addDoc(){
   	// console.log('add doc');
   	this.setState({
   		mode: 'add'
   	});
   }

   subDoc(){
   	// console.log('add doc');
   	this.setState({
   		mode: 'sub'
   	});
   }

   handleInput(e){
   	let input = e.target.value;
   }

   saveInput(){
   	let titleInput = document.getElementsByClassName('addTitleInput')[0];
   	let linkInput = document.getElementsByClassName('addLinkInput')[0];

   	if (this.state.mode === 'sub'){
	   	this.setState({
	   		mode: 'on'
			});
			return;
   	}

   	if (titleInput.value !== '' && linkInput.value !== ''){
   		docsData.unshift({symbol: ''+titleInput.value[0].toUpperCase()+'', logo: '', name: ''+titleInput.value+'', url: 'http://'+linkInput.value+'', type:'added'});

	   	this.setState({
	   		mode: 'on'
			});

			if (localStorage.customDocAmount === undefined){
				// console.log('custom doc amount was undefined');
				localStorage.customDocAmount = 1;
			} else {
				// console.log('adding to custom docs');
				let localDocAmount = parseInt(localStorage.customDocAmount);
				localStorage.customDocAmount = localDocAmount +=1;
				// console.log('local storage custom doc amount:',localStorage.customDocAmount);
			}

			localStorage.customDocs = JSON.stringify(docsData.slice(0, parseInt(localStorage.customDocAmount)));
			// console.log(JSON.parse(localStorage.customDocs));
			// console.log('local docs', localStorage.customDocs);
			// console.log(' new input was saved');

   	} else {
	   	console.log('no input was saved');
	   	this.setState({
	   		mode: 'on'
			});
   	}



		
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
            		<Column large={3} className="doc_bloc" style={{cursor: 'pointer'}} onClick={this.subDoc}>
                     <img className="doc_logo" title="sub" src="src/assets/docs_logos/grey/sub.png"/>
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
      if (this.state.mode === 'sub'){
            	return (
            		<div className="docs_component">
            		   <p style={{'cursor': 'pointer'}} onClick={this.toggleOn}>Hide</p>
            		   <div className="inner_scroll">
	            		   <div style={{'color':'#fff', 'cursor': 'pointer'}} onClick={this.saveInput}>save</div>
	            		   <ul>
	            		   	{docsData.map(function(doc){
										return <li>{doc.name}</li>
	            		   	})}
	            		   </ul>
            		   </div>
            		</div>
         		)
            }
   }
}

Docs.defaultProps = {
   name: 'Docs'
};

export default Docs;