import React, { PropTypes } from 'react';

// Ensure we always return a string representation of a given value
function getString(val) {

  if (val === null) {
    return '-';
  }

  return val.toString();
}

export default function PlayLevel({ position, ante, smallBlind, bigBlind }) {

  return (
    <div className={ `level level--${position}` }>
      <div className="level__ante">{ getString(ante) }</div>
      <div className="level__small-blind">{ getString(smallBlind) }</div>
      <div className="level__big-blind">{ getString(bigBlind) }</div>
    </div>
  );
}
PlayLevel.propTypes = {
  position: PropTypes.string.isRequired,
  ante: PropTypes.number,
  smallBlind: PropTypes.number,
  bigBlind: PropTypes.number
};
PlayLevel.defaultProps = {
  ante: null,
  smallBlind: null,
  bigBlind: null
};
