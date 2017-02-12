import React, { PropTypes } from 'react';
import './TableCell.scss';

export default function TableCell({ children, colSpan, cellCount }) {

  return (
    <div
      className="table__cell"
      style={ {
        flexBasis: `${colSpan * 100 / cellCount}%`
      } }
    >
      { children }
    </div>
  );
}
TableCell.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.number,
  cellCount: PropTypes.number.isRequired
};
TableCell.defaultProps = {
  children: null,
  colSpan: 1
};
