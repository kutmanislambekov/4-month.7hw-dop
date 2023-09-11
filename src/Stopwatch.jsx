import React, { Component } from 'react';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      seconds: 0,
      tenths: 0,
    };
    this.timer = null;
  }

  handleStart = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timer = setInterval(() => {
        const { seconds, tenths } = this.state;
        this.setState({
          tenths: tenths === 9 ? 0 : tenths + 1,
          seconds: tenths === 9 ? seconds + 1 : seconds,
        });
      }, 100);
    }
  };

  handleStop = () => {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    }
  };

  handleReset = () => {
    this.handleStop();
    this.setState({ seconds: 0, tenths: 0 });
  };

  componentWillUnmount() {
    this.handleStop();
  }

  render() {
    const { isRunning, seconds, tenths } = this.state;

    return (
      <div>
        <h1>Секундомер</h1>
        <p>
          Время: {seconds}.{tenths} секунд
        </p>
        <button className='btn1' onClick={this.handleStart} disabled={isRunning}>
          Старт
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Стоп
        </button>
        <button onClick={this.handleReset}>Сброс</button>
      </div>
    );
  }
}

export default Stopwatch;
