import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import $ from 'jquery'

class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      on: true,
      stories: []
    }
  }

  componentDidMount = () => {
    this.getReq()
  }

  handleClick = () => {
    this.setState({ on: !this.state.on })
  }

  getReq = () => {
    let self = this
    const total = 20

    $.getJSON(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      {},
      function(results) {
        let ids = results.slice(0, total)
        getStories(ids)
      }
    )

    function getStories(ids) {
      let stories = []
      for (let j = 0; j < ids.length; j++) {
        $.getJSON(
          'https://hacker-news.firebaseio.com/v0/item/' +
            ids[j] +
            '.json?print=pretty',
          {},
          function(response, i) {
            // fix askHN no response.url
            // console.log(response.url)
            if (response !== null){
              if (response.url === undefined) {
                // console.log('no url', response)
                response.url = 'https://news.ycombinator.com/item?id=' + response.id
              }
              //
              stories.push({
                title: response.title, 
                url: response.url
              })
              setFinalState(stories)
            }
          }
        )
      }
    }

    function setFinalState(stories) {
      // if (stories.length === total) {
        self.setState({ stories: stories })
      // }
    }
  }

  render = () => {
    if (this.state.on) {
      return (
        <div className="outer">
          <h5
            onClick={this.handleClick}
            style={{ color: 'white', cursor: 'pointer' }}
            className="news_title title"
          >
            Hide
          </h5>
          <div className="news_container">
            <ol>
              {this.state.stories.map(function(story, i) {
                return (
                  <li key={i}>
                    <a href={story.url} target="_blank">
                      {story.title}
                    </a>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="fadeout" />
        </div>
      )
    } else {
      return (
        <div className="outer">
          <img
            onClick={this.handleClick}
            src="src/assets/news_icon.png"
            alt="news icon"
            style={{ width: '50px', cursor: 'pointer' }}
          />
        </div>
      )
    }
  }
}

export default News
