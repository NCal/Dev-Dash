import React, { Component } from 'react';
import $ from 'jquery';

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
         user_repo_data: null,
         display_username: null
      };
   }

   componentDidMount() {
      if ( localStorage.user_name !== undefined && localStorage.user_name !== "undefined" ){
         this.getRequest(localStorage.user_name);
         this.setState({on: true});
      }
   }

   handleClick(){
      this.setState({'on': !this.state.on});
   }

   saveInput(e){
      let username = $('.gh_on input').val();
      if (e.key === 'Enter' && username !== ''){this.setUserName(username);} 
      if (e.type === 'click' && username !== ''){ this.setUserName(username);}
   }

   setUserName(username){
      localStorage.user_name = username; this.getRequest(username);
   }

   changeUser(){
      localStorage.user_name = undefined;
      this.setState({user_data: null});
   }

   manageUsernameLength(){
      let self = this;
      let username = this.state.user_data.user;
      let username_length = this.state.user_data.user.length;
      if (username_length > 13){
         let display_un = username.split('');
         display_un.splice(10, display_un.length);
         display_un.push('..');
         display_un = display_un.join('');
         self.setState({display_username: display_un});
      } else {
         self.setState({display_username: username});
      }
   }

   getRequest(username){
      let self = this;
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
            self.setState({user_data: JSON.parse(localStorage.user_data)}, function(){
               self.manageUsernameLength();
            });
           
      }).then(
         // use d3 to visualize data in repos
         // $.getJSON('https://api.github.com/users/'+username+'/repos', 
         //    {
         //       client_id: '28e07835843f7977ad64',
         //       client_secret: 'c971128144f02c7f97f96fdf45bf2649424cb46b'
         //    }, 
         //    function(res){
         //       let repos = [];
         //       res.forEach(function(repo, i){
         //          let repo_data = {
         //             name: res[i].name,
         //             description: res[i].description,
         //             open_issues: res[i].open_issues,
         //             url: res[i].html_url,
         //             last_push: res[i].pushed_at,
         //          };
         //          repos.push(repo_data);
         //       });

         //       localStorage.user_repo_data = JSON.stringify(repos);
         //       self.setState({user_repo_data: JSON.parse(localStorage.user_repo_data)});
         //    }
         // )
         );
   }

   render() {
      if (this.state.on && this.state.user_data === null){
         return (
            <div className="github_component"> 
               <div className="gh_on">
                 <p className="gh_title title gh_hide" onClick={this.handleClick}>Hide</p>
                 <input className="user_name_input" type="text" placeholder="Enter your Github Username" onKeyDown={this.saveInput}/>
                 <div className="save_gh_input  title" onClick={this.saveInput}>Save</div>
               </div>
            </div>
         )
      }
      if (this.state.on && this.state.user_data !== null){
         return (
            <div className="github_component" > 
               <div className="gh_on">
                <p className="gh_title title gh_hide" onClick={this.handleClick}>Hide</p>
                 <a href={this.state.user_data.url} target="_blank"><img src={this.state.user_data.av}  className="gh_av" alt="" target="_blank"/></a>
                 <ul className="user_data_ul">
                    <h5 >{this.state.display_username} <img className="gh_change_user" src="src/assets/edit.png" alt="" onClick={this.changeUser} /></h5>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=following"} target="_blank"><li>Following : {this.state.user_data.following}</li></a>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=followers"} target="_blank"><li>Followers : {this.state.user_data.followers}</li></a>
                    <a href={"https://github.com/"+this.state.user_data.user+"?tab=repositories"} target="_blank"><li>Public Repos : {this.state.user_data.pub_repos}</li></a>
                 </ul>
               </div>
            </div>
         )
      } 
      else {
         return (
            <div className="github_component" onClick={this.handleClick}> 
               <div className="gh_off">
                 <h5 className="gh_title">Github +</h5>
              </div>
            </div>
         )
      }
      
   }
}

export default Github;