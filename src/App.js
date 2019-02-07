import React, { Component } from 'react'
import update from 'immutability-helper'
import mathjs from 'mathjs'
import Button from './Button'
import Buttons from './Buttons'
import Screen from './Screen'
import Label from './Label';
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = { operations: [] }
    this.symbols = ['+', '-', '*', '/', '%', '.']
  }

  handleClick = e => {
    const value = e.target.getAttribute('data-value')
    switch (value) {
      // Clear the screen
      case 'clear':        
        this.setState({ operations: [] })
        break
      // Invert the sign
      case 'pm':
        let number = this.calculate()
        let inverted = mathjs.isNegative(number)
            ? mathjs.abs(number)
            : -mathjs.abs(number)
        this.setState({ operations: [String(inverted)] })
        break
      // Resolve the operations
      case 'res':
        let calc = this.calculate()
        this.setState({ operations: [String(calc)] })
        break
      // Add the value clicked if not clearing or calculating 
      default:
        // Avoid duplicated symbols
        const newOperations = update(
          this.state.operations,
          (this.isDuplicatedSymbol(value)) ? 
          { $splice: [[-1, 1, value]] } :
          { $push: [value] }
        )      
        this.setState({ operations: newOperations })
        break
    }
  }

  /**
   * Check whether the value is a symbol and
   * there is already one
   */
  isDuplicatedSymbol(newValue) {
    let lastValue = this.state.operations[this.state.operations.length-1]
    return (this.symbols.includes(lastValue) && this.symbols.includes(newValue))
  }

  /**
   * Print the result of the operations on the screen
   */
  calculate() {
    let result = this.state.operations.join('')
    if (result) {
      try {
        // Operate whatever is on screen
        result = mathjs.eval(result)
        return mathjs.format(result, { precision: 5 })
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Screen data={this.state.operations} />
        <Buttons>
          <Button><Label onClick={this.handleClick} label="AC" value="clear" type="function" /></Button>
          <Button><Label onClick={this.handleClick} label="7" value="7" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="4" value="4" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="1" value="1" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="0" value="0" type="number" /></Button>

          <Button><Label onClick={this.handleClick} label="±" value="pm" type="function" /></Button>
          <Button><Label onClick={this.handleClick} label="8" value="8" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="5" value="5" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="2" value="2" type="number" /></Button>
          <Button><Label label="" value="null" /></Button>

          <Button><Label onClick={this.handleClick} label="%" value="%" type="function" /></Button>
          <Button><Label onClick={this.handleClick} label="9" value="9" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="6" value="6" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="3" value="3" type="number" /></Button>
          <Button><Label onClick={this.handleClick} label="." value="." type="number" /></Button>
          
          <Button><Label onClick={this.handleClick} label="÷" value="/" type="operator" /></Button>
          <Button><Label onClick={this.handleClick} label="x" value="*" type="operator" /></Button>
          <Button><Label onClick={this.handleClick} label="-" value="-" type="operator" /></Button>
          <Button><Label onClick={this.handleClick} label="+" value="+" type="operator" /></Button>
          <Button><Label onClick={this.handleClick} label="=" value="res" type="operator" /></Button>
        </Buttons>
      </div>
    );
  }
}

export default App;
