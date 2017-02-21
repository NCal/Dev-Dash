import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';


class News extends Component {
	constructor(props) {
		super(props);

		this.Get = this.Get.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			on: false,
			stories: []
		};
		
	}

	componentDidMount() {
		// console.log('new mounted');
		this.Get();
	}

	handleClick(){
		if (this.state.on === false){
				// this.Get();
				this.setState({'on': true});
		} else {
			this.setState({'on': false});
		}
	}

	Get(){
		// console.log('getting');
		let self= this;
		const total = 20;

			$.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
				{},
				 function(results){
					let ids = results.slice(0, total);
					// console.log('ids',ids);
					// console.log(ids.length);
					loop_2(ids);
			});

				function loop_2(ids){
					let stories = [];
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
						// console.log('this.state.stories', self.state.stories);	
					}
			}
}

	render(){
		if (this.state.on === true){
			return (
				<div className="outer" >
					<h5 onClick={this.handleClick} style={{color: 'white', cursor: 'pointer'}} className="news_title title">hide</h5>
					<div className="news_container">
						<ol>
							{this.state.stories.map(function(thang, i){
								return <li key={i}><a href={thang.url} target="blank_">{thang.title}</a></li>
							})}
						</ol>
						<div className="empty"></div>
					</div>
					<div className="fadeout"></div>
			</div>
			)
		} else {
			return (
				<div className="outer" >
					<img onClick={this.handleClick} src="src/assets/news_icon.png" alt="news icon"  style={{width: '50px', cursor: 'pointer'}}/>
				</div>
				)
		}
		
	}
}

News.defaultProps = {
	name: 'News'
};

export default News;