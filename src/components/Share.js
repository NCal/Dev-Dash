import React, { Component } from 'react';
import $ from 'jquery';

class Share extends Component {
   constructor(props) {
      super(props);
      let self = this;
      this.state = {

      };
   }

   render() {
    return (<div className="share">
      <a href="https://goo.gl/KXAtAk" target="_blank"><img src="src/assets/rrs.png" alt="Rate, Review, & Share" title="Rate, Review, & Share"/></a>
    </div>)
   }
}

export default Share;