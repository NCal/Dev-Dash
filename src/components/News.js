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
		this.state = {
			stories: null
		};
		
	}

	componentDidMount() {
		console.log('new mounted');
	}

	Get(){
		let self= this;
		self.setState({stories: null});
		debugger;
		// if (this.state.stories === null){alert('null');}
		// var stories = [];
		$.getJSON(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
			{}
			, function(results){
			// console.log(results);
			if (results.length > 10){
				results = results.slice(0, 10);
				console.log('2: ',results);

				for (var i=0; i < results.length; i++){
					$.getJSON('https://hacker-news.firebaseio.com/v0/item/'+results[i]+'.json?print=pretty',
					{},
					function(stuff){
						stories.push({ title: stuff.title, url: stuff.url});
					});
				}
				
				setTimeout(function(){
						console.log('stories:', stories); 
						self.setState({stories: stories})
						console.log('this.state.stories', self.state.stories);
					},200);
			}
		})

		
	}

	render(){
		if (this.state.stories !== null){
			return (<div className="news_container">
				<h1 onClick={this.Get}>news</h1>
				<ul>
					{this.state.stories.map(function(thang, i){

						return <li key={i}><a href="">{thang.title}</a></li>
					})}
				</ul>
				
			</div>)
		} else {
			return <div></div>
		}
		
	}
}

export default News;