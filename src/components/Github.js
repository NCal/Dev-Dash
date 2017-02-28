import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';
import GitHub from 'github-api';


class Github extends Component {
   constructor(props) {
      super(props);
      this.getRequest = this.getRequest.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.saveInput = this.saveInput.bind(this);
      this.changeUser = this.changeUser.bind(this);
      let self = this;
      this.state = {
         on: false,
         user_data: null,
         user_name: null,
         user_repo_data: null
      };
      
   }

   componentDidMount() {
      console.log('github mounted');
      console.log(this.state.user_data);
      if ( localStorage.user_name !== undefined && localStorage.user_name !== "undefined" ){
         this.getRequest(localStorage.user_name);
         this.setState({on: true});
      }
   }

   handleClick(){
      console.log('handle click');
      this.setState({'on': !this.state.on});
   }

   saveInput(){
      let username = $('.gh_on input').val();
      localStorage.user_name = username;
      this.getRequest(username);
   }

   changeUser(){
      localStorage.user_name = undefined;
      this.setState({user_data: null});
   }

   getRequest(username){
      console.log('USERNAME', username);
      let self = this;
      // Run request automatically if data is already in local storage
      $.getJSON('https://api.github.com/users/'+ username, 
         {client_id: '28e07835843f7977ad64',
          client_secret: 'c971128144f02c7f97f96fdf45bf2649424cb46b'
         }, 
         function(res){
            let user_data = {
               user : res.login,
               id: res.id,
               location : res.location,
               pub_repos : res.public_repos,
               url : res.html_url,
               av : res.avatar_url,
               followers: res.followers,
               following: res.following,
               recentEvents: res.received_events_url,
               subcriptions: res.subscriptions_url,
               lastUpdate: res.updated_at,
               repos: res.repos_url,
            };
            
            localStorage.user_data = JSON.stringify(user_data);
            self.setState({user_data: JSON.parse(localStorage.user_data)});
            console.log('USER DATA', user_data);
           
      }).then(
         $.getJSON('https://api.github.com/users/'+username+'/repos', 
            {
               client_id: '28e07835843f7977ad64',
               client_secret: 'c971128144f02c7f97f96fdf45bf2649424cb46b'
            }, 
            function(resp){
               let repos = [];
               resp.forEach(function(repo, i){
                  let repo_data = {
                     name: resp[i].name,
                     description: resp[i].description,
                     open_issues: resp[i].open_issues,
                     url: resp[i].html_url,
                     last_push: resp[i].pushed_at,
                  };
                  repos.push(repo_data);
               });
               // console.log('repos', repos);
               localStorage.user_repo_data = JSON.stringify(repos);
               self.setState({user_repo_data: JSON.parse(localStorage.user_repo_data)});

               console.log('state', self.state);
            }
      ));
   }

   render() {
      if (this.state.on && this.state.user_data === null){
         return (
            <div className="github_component" style={{'cursor': 'pointer'}}> 
               <div className="gh_on">
                 <p className="gh_title title" style={{'float': 'right'}} onClick={this.handleClick}>Hide</p>
                 <input type="text" placeholder="Enter your Github Username" style={{width: '230px', 'position': 'absolute', 'top': '50px'}}/>
                 <div className="save_gh_input  title" style={{'text-align':'right', 'position': 'absolute', 'bottom': '20px', 'cursor': 'pointer', 'font-size':'20px'}} onClick={this.saveInput}>Save</div>

               </div>
            </div>
         )
      }
      if (this.state.on && this.state.user_data !== null){
         return (
            <div className="github_component" > 
               <div className="gh_on">
                <p className="gh_title title" style={{'float': 'right'}} onClick={this.handleClick}>Hide</p>
                 <a href={this.state.user_data.url}><img src={this.state.user_data.av}  style={{width: '120px'}} alt="" target="_blank"/></a>
                 <ul style={{'position': 'absolute', 'top':'25px', 'left': '120px', 'listStyleType':'none'}}>
                    <h5>{this.state.user_data.user}</h5>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=following"}><li>Following : {this.state.user_data.following}</li></a>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=followers"}><li>Followers : {this.state.user_data.followers}</li></a>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=repositories"}><li>Public Repos : {this.state.user_data.pub_repos}</li></a>
                 </ul>
                 <p className="gh_title title" style={{'position':'absolute', 'bottom': '10px', 'opacity': '0.7', 'cursor': 'pointer'}} onClick={this.changeUser}>Change User</p>
               </div>
            </div>
         )
      } 
      else {
         return (
            <div className="github_component" onClick={this.handleClick}> 
               <div className="gh_off">
                 <p className="gh_title title">Github +</p>

              </div>
            </div>
         )
      }
      
   }
}



export default Github;