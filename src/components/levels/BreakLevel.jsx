import React, { PropTypes } from 'react';

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
