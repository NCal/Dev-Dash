import React, { Component } from 'react'
import { Row, Column } from 'react-foundation'
import $ from 'jquery'

class DocsSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'docs_search',
      add_state: false
    }
  }

  onEdit = e => {
    let search = e

    for (let i = 0; i < JSON.parse(localStorage.preDocsData).length; i++) {
      if (
        JSON.parse(localStorage.preDocsData)
          [i].name.toLowerCase()
          .indexOf(search.toLowerCase()) === -1
      ) {
        $(
          '.doc_bloc img[title="' +
            JSON.parse(localStorage.preDocsData)[i].name +
            '"]'
        )
          .parent()
          .hide()
        $(
          '.doc_bloc h3[title="' +
            JSON.parse(localStorage.preDocsData)[i].name +
            '"]'
        )
          .parent()
          .hide()
      } else {
        $(
          '.doc_bloc img[title="' +
            JSON.parse(localStorage.preDocsData)[i].name +
            '"]'
        )
          .parent()
          .show()
        $(
          '.doc_bloc h3[title="' +
            JSON.parse(localStorage.preDocsData)[i].name +
            '"]'
        )
          .parent()
          .show()
      }
    }
  }

  handleInput = e => {
    let search = e.target.value
    this.onEdit(search)
  }

  render = () => {
    if (!this.state.add_state) {
      return (
        <div>
          <input
            type="text"
            className="docs_search_input"
            placeholder="search"
            onChange={this.handleInput}
          />
        </div>
      )
    } else {
      return (
        <div>
          <div>+</div>
          <input
            type="text"
            className="docs_search_input"
            placeholder="search"
            onChange={this.handleInput}
          />
        </div>
      )
    }
  }
}

export default DocsSearch
