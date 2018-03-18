import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatTime } from '@/modules';

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

export default class Clock extends PureComponent {
  static propTypes = {
    remainingTime: PropTypes.number.isRequired,
    totalTime: PropTypes.number
  };
  static defaultProps = {
    totalTime: null
  };

  render() {
    const { remainingTime, totalTime } = this.props;
    const percent = 100 - (remainingTime / totalTime * 100);
    const radius = 50 - (PATH_WIDTH / 2);
    const length = Math.PI * 2 * radius;
    const pathString = `M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}`;

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
          strokeWidth={ getPathWidth(percent) }
          fillOpacity="0"
          style={ {
            strokeDasharray: `${length}px ${length}px`,
            strokeDashoffset: `${((100 - percent) / 100 * length)}px`,
            transition: 'stroke-dashoffset 0.3s ease 0s, stroke-width 0.3s ease, stroke 0.3s ease'
          } }
        />
        <text
          className="clock__display"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          x="50"
          y="50"
        >
          { formatTime(remainingTime) }
        </text>
      </svg>
    );
  }
}
