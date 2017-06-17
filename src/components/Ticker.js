import React, { Component } from 'react';
import { Row, Column } from 'react-foundation';
import $ from 'jquery';


class Ticker extends Component {
   constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
      this.getReq = this.getReq.bind(this);
      this.saveInput = this.saveInput.bind(this);

      this.state = {
         on: true,
         coin: null
      };
   }

   componentDidMount() {
      // this.getReq();
      console.log('Ticker');
   }

   handleClick(){
      // this.setState({'on': !this.state.on});
      // this.getReq();
   }

   getReq(coin){
      let self= this;
      const total = 20;

      $.getJSON('https://api.coinmarketcap.com/v1/ticker/'+coin+'/',
         {},
          function(results){
            console.log(results[0]);
            // let ids = results.slice(0, total);
            // getStories(ids);
      })
      .done(function() { console.log('getJSON request succeeded!'); })
      .fail(function() { console.log('getJSON request failed! '); })
      .always(function() { console.log('getJSON request ended!'); });


   }
      
   saveInput(e){
      console.log(e.target.value);
      console.log('save input');
      let coin = e.target.value;
      console.log('coin', coin);
      if (e.key === 'Enter' && coin !== ''){this.setState({coin: coin}); this.getReq(coin);} 
   }



   render(){
      if (this.state.on){
         return (
            <div className="ticker" onClick={this.handleClick}>
               <h1>Ticker on</h1>
               <input className="coin_input" type="text" placeholder="Enter a coin" onKeyDown={this.saveInput}/>
         </div>
         )
      } else {
         return (
            <div className="ticker" onClick={this.handleClick}>
              <h1>Ticker off</h1>
            </div>
            )
      }
      
   }
}

Ticker.defaultProps = {
   name: 'Ticker'
};

export default Ticker;