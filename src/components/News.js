import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';
// import child_process from 'xmlhttprequest';
// import fs from 'xmlhttprequest';
// import XMLHttpRequest from 'xmlhttprequest';
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// console.log(XHMLHttpRequest);

// import hn from 'hackernews-api';
var stories = [];
class News extends Component {
	constructor(props) {
		super(props);

		this.Get = this.Get.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			on: false,
			stories: null
		};
		
	}

	componentDidMount() {
		console.log('new mounted');
	}

	handleClick(){
		if (this.state.on === false){
				this.Get();
				this.setState({'on': true});
		} else {
			this.setState({'on': false});
		}
	}

	Get(){
		let self= this;
		const total = 10;

			$.getJSON(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
				{},
				 function(results){
					let ids = results.slice(0, total);
					console.log('ids',ids);
					console.log(ids.length);
					loop_2(ids);
			});

				function loop_2(ids){
					stories = [];
					for (var j=0; j < ids.length; j++){
						$.getJSON('https://hacker-news.firebaseio.com/v0/item/'+ids[j]+'.json?print=pretty',
						{},
						function(response){
							stories.push({ title: response.title, url: response.url});
							final(stories);
						});
					}
				}
				
			
			function final(stories){
				if (stories.length === total){
					self.setState({stories: stories});
					console.log('this.state.stories', self.state.stories);	
				}
			}
	}

	render(){
		if (this.state.on === true){
			return (<div className="outer" ><div className="news_container">
				{/*<h1 onClick={this.handleClick}>news</h1>*/}
				<h5 onClick={this.handleClick} style={{color: 'white', cursor: 'pointer'}}>hide</h5>
				
				<ul>
					{this.state.stories.map(function(thang, i){
						return <li key={i}><a href={thang.url} target="blank_">{thang.title}</a></li>
					})}
				</ul>
			</div></div>)
		} else {
			return (<div className="news_container" style={{cursor: 'pointer'}} onClick={this.handleClick}>
				<h5  style={{color: 'white', cursor: 'pointer'}}>news</h5>
				<img src="src/assets/news_icon.png" alt="news icon"  style={{width: '50px', cursor: 'pointer'}}/>
				</div>)
		}
		
	}
}

export default News;