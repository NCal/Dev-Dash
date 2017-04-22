import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jquery';
import Search from './Search.js';
import MainDate from './Date.js';
import News from './News.js';
import Add from './Add.js';
import Weather from './Weather.js';
import Github from './Github.js';
import Docs from './Docs.js';
import Share from './Share.js';
import picsData from '../data/picsData.js';

class App extends Component {
   constructor(props, context) {
      super(props, context);
      this.changeBackground = this.changeBackground.bind(this);

      this.state = {
       name: 'App',
      };
  }
   componentDidMount() {
      this.changeBackground();
      // this.getBg();
      setTimeout(function(){
         $('.overlay').fadeOut(200);
      },30);
   }

   changeBackground(){
      let today = new Date;
      let todayNum = today.getDate();
      $('.bg_image').css({'background-image': 'url(src/assets/bg_photos/'+todayNum+'.jpg)'});
   }

   getBg(){
    console.log('get bg');
    // $.get('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={86aa1ecca9719d0d668bf726a8401b9f}&tags=flower&per_page=3&format=json')
    $.get('https://api.flickr.com/services/rest/?method=flickr.photos.search',
      {
      api_key:'86aa1ecca9719d0d668bf726a8401b9f',
      format:'json',
      tags: 'landscape, nature', 
      extras: ', original_format, o_dims, url_o',
      privacy_filter: 5

    },
      function(response){
        response = response.replace('jsonFlickrApi(', '');
        response = response.replace('})', '}');
        response = JSON.parse(response);
        // console.log(response);
        response.photos.photo.map(function(thing){
          // console.log(thing);
          // if (Number(thing.width_o) > 2000){
            console.log(thing);
            console.log('small', 'https://farm'+thing.farm+'.staticflickr.com/'+thing.server+'/'+thing.id+'_'+thing.secret+'.jpg');
            console.log('original size',thing.url_o);
          // }
          // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        });
      });

   }
   render(){
      return (
         <div className="application">
            <div className="bg_image">
            <div className="underlay"></div>
                {/* <Add/>*/}
                <Share/>
               <MainDate/>
               <Search/>
               <News/>
               <Weather/>
               <Docs/>
               <Github/>
            </div>
         </div>
      )
   }
}

// PROPS 
App.defaultProps = {
   name:'APP',
   kind: 'Parent'
};

App.propTypes = {
   name: React.PropTypes.string.isRequired,
   kind: React.PropTypes.string
}

export default App;