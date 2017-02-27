import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';
import GitHub from 'github-api';


// console.log(GitHub);

class Github extends Component {
   constructor(props) {
      super(props);
      this.request = this.request.bind(this);
      
   }

   componentDidMount() {
      console.log('github mounted');
      this.request();
   }

   request(){
      // unauthenticated client


      var gh = new GitHub({
         username: '',
         password: ''
         /* also acceptable:
            token: 'MY_OAUTH_TOKEN'
          */
      });


      me.listStarredRepos(function(err, repos) {
         // look at all the starred repos!
         console.log(repos);
      });

      // $.getJSON('https://github.com/login/oauth/authorize', 
      // {
      //    client_id: '',
      //    redirect_uri: '',
      //    scope: '',
      //    state: '', //needs to be randomized programmatically 
      //    allow_signup: ''
      // }, 
      // function(res){
      // });
   }

   render() {
      return (<div> 
            potato
         </div>
         )
   }
}



export default Github;