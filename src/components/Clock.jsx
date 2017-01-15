import React, { Component, PropTypes } from 'react';
import { padSection } from '../modules';

export default class Clock extends Component {
  static propTypes = {
    remainingTime: PropTypes.object.isRequired
  };

  render() {
    const { remainingTime } = this.props;

    return (
      <section className="clock">
        <span className="minutes">{ padSection(remainingTime.m) }</span>
        <span className="colon">:</span>
        <span className="seconds">{ padSection(remainingTime.s) }</span>
      </section>
    );
  }
};
