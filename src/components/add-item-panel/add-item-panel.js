import React, { Component } from 'react';

import './add-item-panel.css';

export default class AddItemPanel extends Component {
  state = {
    label: ''
  };

  onChange = e => {
    this.setState({
      label: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);

    this.setState({
      label: ''
    });
  };
  render() {
    return (
      <form className="add-item-panel" onSubmit={this.onSubmit}>
        <input
          placeholder="Add item"
          className="add-item-input"
          onChange={this.onChange}
          value={this.state.label}
        />
        <button type="submit" className="btn btn-outline-success btn-sm">
          <i className="fa fa-plus-circle"></i>
        </button>
      </form>
    );
  }
}
