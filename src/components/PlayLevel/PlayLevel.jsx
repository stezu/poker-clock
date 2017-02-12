import React, { PropTypes } from 'react';
import { getBlindString } from '../../modules';

export default function PlayLevel({ position, ante, smallBlind, bigBlind }) {

  return (
    <div className={ `level level--${position}` }>
      <div className="level__ante">{ getBlindString(ante) }</div>
      <div className="level__small-blind">{ getBlindString(smallBlind) }</div>
      <div className="level__big-blind">{ getBlindString(bigBlind) }</div>
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
