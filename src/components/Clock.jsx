import React, { Component, PropTypes } from 'react';
import Duration from 'duration-js';

// Given a number, return a string that has at least 2 characters
function padSection(num) {
  var str = `${num}`;

  if (str.length >= 2) {
    return str;
  }

  return `00${str}`.slice(-2);
}

// Get the remaining time in minutes and seconds
function getRemainingTime({ start, duration, now }) {
  const result = {
    m: 0,
    s: 0,
    total: 0
  };

  if (duration) {
    const delta = new Duration(duration - (now - start));

    // Get the value in minutes, this can theoretically be more than 60.
    result.m = delta.minutes();

    // Get the entire value in milliseconds, then remove the extracted whole minutes, then
    // divide by 1000 to get seconds and then round the value to get an integer.
    result.s = Math.floor((delta.valueOf() - (result.m * 60 * 1000)) / 1000);

    // The total time in seconds, when this reaches 0, we have finished the level.
    result.total = delta.seconds();
  }

  return result;
}

export default class Clock extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired
  };

  remainingTime = {};

  componentDidMount() {

    const animate = () => {
      const { timer, onTimeEnd } = this.props;

      this.remainingTime = getRemainingTime({
        start: timer.startTime,
        duration: timer.duration,
        now: Date.now()
      });

      if (this.remainingTime.total <= 0) {
        onTimeEnd();
      }

      this.forceUpdate();
      this._interval = requestAnimationFrame(animate);
    };

    animate();
  }

  componentWillUnmount() {

    if (this._interval) {
      cancelAnimationFrame(this._interval);
    }
  }

  render() {

    return (
      <section className="clock">
        <span className="minutes">{ padSection(this.remainingTime.m) }</span>
        <span className="colon">:</span>
        <span className="seconds">{ padSection(this.remainingTime.s) }</span>
      </section>
    );
  }
};
