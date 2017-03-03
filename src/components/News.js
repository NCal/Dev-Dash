import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jQuery';


class News extends Component {
   constructor(props) {
   	super(props);

      this.getReq = this.getReq.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
         on: true,
         stories: []
      };
   }

   componentDidMount() {
      this.getReq();
   }

   handleClick(){
      this.setState({'on': !this.state.on});
   }

   getReq(){
      let self= this;
      const total = 20;

         $.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
            {},
             function(results){
               let ids = results.slice(0, total);
               getStories(ids);
         });

            function getStories(ids){
               let stories = [];
               for (let j=0; j < ids.length; j++){
                  $.getJSON('https://hacker-news.firebaseio.com/v0/item/'+ids[j]+'.json?print=pretty',
                  {},
                  function(response){
                     stories.push({ title: response.title, url: response.url});
                     setFinalState(stories);
                  });
               }
            }
            
         function setFinalState(stories){
            if (stories.length === total){
                  self.setState({stories: stories});
            }
         }
}

   render(){
      if (this.state.on){
         return (
            <div className="outer" >
               <h5 onClick={this.handleClick} style={{color: 'white', cursor: 'pointer'}} className="news_title title">hide</h5>
               <div className="news_container">
                  <ol>
                     {this.state.stories.map(function(story, i){
                        return <li key={i}><a href={story.url} target="_blank">{story.title}</a></li>
                     })}
                  </ol>
               </div>
               <div className="fadeout"></div>
         </div>
         )
      } else {
         return (
            <div className="outer" >
               <img onClick={this.handleClick} src="src/assets/news_icon.png" alt="news icon"   style={{width: '50px', cursor: 'pointer'}}/>
            </div>
            )
      }
      
   }
}

News.defaultProps = {
   name: 'News'
};

export default News;