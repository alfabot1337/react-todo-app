import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  render() {
    return (
      <input
        placeholder="Search"
        className="search-panel"
        onChange={e => this.props.onChangeValue(e.target.value)}
      />
    );
  }
}
