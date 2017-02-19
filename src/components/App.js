import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';

import Search from './Search.js';
import Main_Date from './Date.js';
import News from './News.js';
import Weather from './Weather.js';
import Docs from './Docs.js'

class App extends Component {
  constructor(props, context) {
      super(props, context);

        this.outer_click_handler = this.outer_click_handler.bind(this);
      // STATE
      this.state = {
        name: 'App',
      };
  }

  componentDidMount() {
    // console.log('Component ' + this.props.name + ' Mounted');
  }
  outer_click_handler(e) {
    // console.log('outer click handler', e);
  }


  render(){
    return (
      <div className="application">
         <Search/>
         <Main_Date/>
         <News/>
         <Weather/>
         <Docs/>
      </div>)
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