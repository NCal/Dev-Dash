import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import $ from 'jQuery';
import Search from './Search.js';
import MainDate from './Date.js';
import News from './News.js';
import Weather from './Weather.js';
import Docs from './Docs.js';
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
      setTimeout(function(){$('.overlay').fadeOut(1000)},500);
   }

   changeBackground(){
      console.log('change background');
      let today = new Date;
      let todayNum = today.getUTCDate();
      $('body').css({'background-image': 'url(src/assets/bg_photos/'+todayNum+'.jpg)'});
   }
   render(){
      return (
         <div className="application">
            <Search/>
            <MainDate/>
            <News/>
            <Weather/>
            <Docs/>
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