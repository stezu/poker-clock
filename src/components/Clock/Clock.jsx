import React, { PropTypes } from 'react';
import { padSection } from '../../modules';
import './Clock.scss';

const PATH_WIDTH = 5;

function getPathWidth(percent) {

  // When a timer is not running, the path should be hidden
  if (isNaN(percent)) {
    return 0;
  }

  return PATH_WIDTH;
}

function getPathColor(percent) {

  // 90-100% is read
  if (percent > 90) {
    return '#FF0000';
  }

  // 60-90% is yellow
  if (percent > 60) {
    return '#FFFF00';
  }

  // 0-60% is green
  return '#00FF00';
}

export default function Clock({ remainingTime, totalTime }) {
  const percent = 100 - (remainingTime.total / totalTime * 100);
  const pathWidth = getPathWidth(percent);
  const radius = 50 - (PATH_WIDTH / 2);
  const length = Math.PI * 2 * radius;
  const pathString = `M 50,50 m 0,-${radius}
    a ${radius},${radius} 0 1 1 0,${2 * radius}
    a ${radius},${radius} 0 1 1 0,-${2 * radius}`;
  const pathStyle = {
    strokeDasharray: `${length}px ${length}px`,
    strokeDashoffset: `${((100 - percent) / 100 * length)}px`,
    transition: 'stroke-dashoffset 0.3s ease 0s, stroke-width 0.3s ease, stroke 0.3s ease'
  };

  return (
    <svg
      className="clock"
      viewBox="0 0 100 100"
    >
      <path
        className="clock__circle-trail"
        d={ pathString }
        stroke="#CDCDCD"
        strokeWidth="1"
        fillOpacity="0"
      />
      <path
        className="clock__circle-path"
        d={ pathString }
        strokeLinecap="butt"
        stroke={ getPathColor(percent) }
        strokeWidth={ pathWidth }
        fillOpacity="0"
        style={ pathStyle }
      />
      <text
        className="clock__display"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#FFFFFF"
        x="50"
        y="50"
      >
        { `${padSection(remainingTime.m)}:${padSection(remainingTime.s)}` }
      </text>
    </svg>
  );
}
Clock.propTypes = {
  remainingTime: PropTypes.shape({
    m: PropTypes.number,
    s: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  totalTime: PropTypes.number.isRequired
};
