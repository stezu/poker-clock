import React, { PropTypes } from 'react';
import { padSection } from '../modules';

export default function Clock({ remainingTime }) {
  return (
    <section className="clock">
      <span className="minutes">{ padSection(remainingTime.m) }</span>
      <span className="colon">{ ':' }</span>
      <span className="seconds">{ padSection(remainingTime.s) }</span>
    </section>
  );
}

Clock.propTypes = {
  remainingTime: PropTypes.shape({
    m: PropTypes.number,
    s: PropTypes.number
  }).isRequired
};
