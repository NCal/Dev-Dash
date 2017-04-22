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
      this.docDelete = this.docDelete.bind(this);
      this.localDocDelete = this.localDocDelete.bind(this);

      this.state = {
         mode: 'off',
         docInput: null,
         customDocs: false,
      };
   }
    
    componentWillMount() {
          localStorage.customDocs= undefined;
          this.doesPreDocsExist();
    }
   componentDidMount() {

   	if (localStorage.customDocAmount === "0"){
   		this.setState({customDocs: false});
   	}
   }

   doesPreDocsExist(){
      if (localStorage.preDocsData === undefined){
            console.log('no predocs loaded, so loading them now');
            localStorage.preDocsData = JSON.stringify(docsData);
            localStorage.customDocAmount = 13;
      } else {
        console.log('predocs already exist');
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
		this.localDocDelete(e);
   }

   localDocDelete(e){
    let self = this;
   	let elToRemove = e.target.parentElement.innerText;
    let js_preDocs =  JSON.parse(localStorage.preDocsData);
    console.log(elToRemove);

   	js_preDocs.forEach(function(doc, i){
       if (doc.name === elToRemove){
			 	e.target.parentElement.remove();

        js_preDocs.splice(js_preDocs.indexOf(doc), 1);



				let localDocAmount = parseInt(localStorage.customDocAmount);


				localStorage.customDocAmount = localDocAmount -=1;
				// localStorage.customDocs = JSON.stringify(JSON.parse(localStorage.preDocsData).slice(0, parseInt(localStorage.customDocAmount)));

				if (localStorage.customDocAmount === "0"){ self.setState({customDocs: false});}
			}
      
   	});
      localStorage.preDocsData = JSON.stringify(js_preDocs);
      console.log('after',js_preDocs);
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
      let localDocs = JSON.parse(localStorage.preDocsData);
      localDocs.unshift({symbol: ''+titleInput.value[0].toUpperCase()+'', logo: '', name: ''+titleInput.value+'', url: 'http://'+linkInput.value+'', type:'added'});
      localStorage.preDocsData = JSON.stringify(localDocs);
      
	   	this.setState({
	   		mode: 'on',
	   		customDocs: true
			});

			if (localStorage.customDocAmount === undefined){ localStorage.customDocAmount = 1;} 
			else {
				let localDocAmount = parseInt(localStorage.customDocAmount);
				localStorage.customDocAmount = (localDocAmount +=1);
			}

   	} else {
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
                 	JSON.parse(localStorage.preDocsData).map(function(doc, i){
                 	if (doc.type ==="added" ){
                 		return <a key={i} style={{color: '#fff'}} href={doc.url} target="_blank"><Column large={3} className="doc_bloc">
                 		   <h3 title={doc.name}>{doc.symbol}</h3>
                 		</Column></a>
                 	} else {
                 		return <a key={i} style={{color: '#fff'}} href={doc.url} target="_blank"><Column large={3} className="doc_bloc">
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
      if (this.state.mode === 'sub'){
            	return (
            		<div className="docs_component">
            		   <p style={{'cursor': 'pointer'}} onClick={this.toggleOn}>Hide</p>
            		   <div style={{'color':'#fff', 'cursor': 'pointer', marginBottom: '10px'}} onClick={this.saveInput}>save</div>
            		   <div className="inner_scroll">
	            		   <ul>
	            		   	{
	            		   		JSON.parse(localStorage.preDocsData).map(function(doc, i){
	            		   			// if (doc.type === 'added'){
	            		   				return <li className={'userDoc'+i} key={'doc'+ i} style={{'color':'#fff'}} onClick={this.docDelete}>{doc.name}<img src="src/assets/docs_logos/grey/delete.png" className="doc_delete_button" /></li>
	            		   			// }
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