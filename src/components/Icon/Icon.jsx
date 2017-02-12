import React, { PropTypes } from 'react';
import * as icons from '../../constants/icons';
import './Icon.scss';

export default function Icon({ name, size, ...restProps }) {

  return (
    <svg
      className="icon"
      width={ size }
      height={ size }
      viewBox="0 0 36 36"
      { ...restProps }
    >
      <path d={ icons[name.toUpperCase()] } />
    </svg>
  );
}
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number
};
Icon.defaultProps = {
  size: 24
};
