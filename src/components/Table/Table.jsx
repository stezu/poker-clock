import React, { PropTypes } from 'react';
import './Table.scss';

export default function Table({ children, className }) {

  return (
    <ul className={ `table ${className}` }>
      { children }
    </ul>
  );
}
Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired
};
Table.defaultProps = {
  children: null
};
