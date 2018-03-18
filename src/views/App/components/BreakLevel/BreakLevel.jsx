import React from 'react';
import PropTypes from 'prop-types';

export default function BreakLevel({ position }) {

  return (
    <div className={ `level level--break level--${position}` }>
      <div className="level__break">{ 'Break' }</div>
    </div>
  );
}

BreakLevel.propTypes = {
  position: PropTypes.string.isRequired
};
