import React, { Component } from 'react';
import './Label.css';

class Label extends Component {
  render() {
    return (
      <div className="Label"
        onClick={this.props.onClick}
        data-type={this.props.type}
        data-value={this.props.value}>
        {this.props.label}
      </div>
    );
  }
}

export default Label;