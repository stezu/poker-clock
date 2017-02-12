import React, { PropTypes } from 'react';
import './TableRow.scss';

export default function TableRow({ children, cellCount, ...restProps }) {

  return (
    <li className="table__row" { ...restProps }>
      { React.Children.map(children, (child) =>
        React.cloneElement(child, {
          cellCount
        })
      ) }
    </li>
  );
}
TableRow.propTypes = {
  children: PropTypes.node,
  cellCount: PropTypes.number.isRequired
};
TableRow.defaultProps = {
  children: null
};
