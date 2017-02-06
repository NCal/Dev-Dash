import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Column } from 'react-foundation';
import Foundation from 'react-foundation';
import Quote_array from '../data/quote_array.js';
import audio from '../data/audio_array.js';
import About from './about.js';

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
      <div>
      <div className="application">
      {/*  <Row className="display"> */}
          <Column  large={8}>
              <About/>
          </Column>
       {/*  </Row>*/}
        </div>
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