'use client';
import React, { Component } from 'react';
import Button from './Button';

export default class CounterClass extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Lifecycle methods
  componentDidMount(): void {
    // console.log('Counter Class - ComponentDidMount');
  }

  componentDidUpdate(): void {
    // console.log('Counter Class - ComponentDidUpdate');
  }

  componentWillUnmount(): void {
    // console.log('Counter Class - ComponentWillUnmount');
  }

  render() {
    // console.log('CounterClass - rendering');
    return (
      <div className="flex flex-col gap-4 rounded-md border p-4 text-center">
        <h2>Class Component Counter</h2>
        <p>Count: {this.state.count}</p>
        <Button onClick={this.increment} text="Increment - Class Component" />
      </div>
    );
  }
}
