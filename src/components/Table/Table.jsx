import React, { PropTypes } from 'react';
import './Table.scss';

export default function Table({ children, ...restProps }) {

  return (
    <ul className="table" { ...restProps }>
      { children }
    </ul>
  );
}
Table.propTypes = {
  children: PropTypes.node
};
Table.defaultProps = {
  children: null
};
