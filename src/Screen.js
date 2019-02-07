import React, { Component } from 'react';
import './Screen.css'

class Screen extends Component {
  render() {
    const display = this.props.data.join('')
    return <div className="Screen"> {display} </div>
  }
}

export default Screen;