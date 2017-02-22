import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';

import Search from './Search.js';
import MainDate from './Date.js';
import News from './News.js';
import Weather from './Weather.js';
import Docs from './Docs.js';

class App extends Component {
   constructor(props, context) {
      super(props, context);
      // STATE
      this.state = {
         name: 'App',
      };
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