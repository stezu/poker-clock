import React, { PropTypes } from 'react';
import './TableRow.scss';

export default function TableRow({ children, cellCount }) {

  return (
    <div className="table__row">
      { React.Children.map(children, (child) =>
        React.cloneElement(child, {
          cellCount
        })
      ) }
    </div>
  );
}
TableRow.propTypes = {
  children: PropTypes.node,
  cellCount: PropTypes.number.isRequired
};
TableRow.defaultProps = {
  children: null
};
