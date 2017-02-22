import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
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
      this.docDelete = this.docDelete.bind(this);
      this.localDocDelete = this.localDocDelete.bind(this);
      
      this.state = {
         mode: 'off',
         docInput: null,
         customDocs: false,
      };
   }

   componentDidMount() {
   	// console.log(Docs);
   	this.handleCustomDocs();

   	if (localStorage.customDocAmount === "0"){
   		this.setState({customDocs: false});
   	}
   }

   handleCustomDocs(){
   	// console.log('handle custom docs');
		if (localStorage.customDocAmount !== undefined){
			let customDocs = JSON.parse(localStorage.customDocs);
			// console.log('we have custom docs here:', customDocs);
			customDocs.forEach(function(doc){
				docsData.unshift(doc);
			});
			// console.log('updated docs data', docsData);
			this.setState({customDocs: !this.state.customDocs});
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
   	this.setState({
   		mode: 'add'
   	});
   }

   subDoc(){
   	this.setState({
   		mode: 'sub'
   	});
   }

   docDelete(e){
		let self = this;
		this.localDocDelete(e);
   }

   localDocDelete(e){
   	let elToRemove = e.target.parentElement.innerText;

   	docsData.forEach(function(doc, i){
			 if (doc.type === 'added' && doc.name === elToRemove){
			 	e.target.parentElement.remove();
				let startIndex = docsData.indexOf(doc);
				let localDocAmount = parseInt(localStorage.customDocAmount);

				docsData.splice(startIndex, 1);
				localStorage.customDocAmount = localDocAmount -=1;
				localStorage.customDocs = JSON.stringify(docsData.slice(0, parseInt(localStorage.customDocAmount)));

				if (localStorage.customDocAmount === "0"){ self.setState({customDocs: false});}
			}
   	});
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
	   		mode: 'on',
	   		customDocs: true
			});

			if (localStorage.customDocAmount === undefined){ localStorage.customDocAmount = 1;} 
			else {
				let localDocAmount = parseInt(localStorage.customDocAmount);
				localStorage.customDocAmount = localDocAmount +=1;
			}

			localStorage.customDocs = JSON.stringify(docsData.slice(0, parseInt(localStorage.customDocAmount)));

   	} else {
	   	// console.log('no input was saved');
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
                 {
                 	docsData.map(function(doc, i){
                 	if (doc.type ==="added" ){
                 		return <a key={i} style={{color: '#fff'}} href={doc.url}><Column large={3} className="doc_bloc">
                 		   <h3 title={doc.name}>{doc.symbol}</h3>
                 		</Column></a>
                 	} else {
                 		return <a key={i} style={{color: '#fff'}} href={doc.url}><Column large={3} className="doc_bloc">
                 		   <img className="doc_logo" title={doc.name} src={doc.logo}/>
                 		</Column></a>
                 	}
                  })
                 } 
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
      		   <input className="addTitleInput" type="text" placeholder="Name"/>
      		   <input className="addLinkInput" type="text" placeholder="Link"/>
      		   <div style={{'color':'#fff', 'cursor': 'pointer'}} onClick={this.saveInput}>save</div>
      		</div>
   		)
      }
      if (this.state.mode === 'sub' && this.state.customDocs ===true){
            	return (
            		<div className="docs_component">
            		   <p style={{'cursor': 'pointer'}} onClick={this.toggleOn}>Hide</p>
            		   <div style={{'color':'#fff', 'cursor': 'pointer', marginBottom: '10px'}} onClick={this.saveInput}>save</div>
            		   <div className="inner_scroll">
	            		   <ul>
	            		   	{
	            		   		docsData.map(function(doc, i){
	            		   			if (doc.type === 'added'){
	            		   				return <li className={'userDoc'+i} key={'doc'+ i} style={{'color':'#fff'}} onClick={this.docDelete}>{doc.name}<img src="src/assets/docs_logos/grey/delete.png" className="docDeleteButton" /></li>
	            		   			}
		            		   	}.bind(this))
	            		   	}
	            		   </ul>
            		   </div>
            		</div>
         		)
      } else {
      	return (
      		<div className="docs_component">
      		   <p style={{'cursor': 'pointer'}} onClick={this.toggleOn}>Hide</p>
      		   <p style={{textAlign: 'left'}}>No custom links here</p>
      		   <div style={{'color':'#fff', 'cursor': 'pointer', marginTop: '20px', fontStyle: 'italic'}} onClick={this.saveInput}>back</div>
   		   </div> )
      }
   }
}

Docs.defaultProps = {
   name: 'Docs'
};

export default Docs;