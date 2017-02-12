import React, { PropTypes } from 'react';
import './TableCell.scss';

export default function TableCell({ children, ...restProps }) {

  return (
    <td className="table__cell" { ...restProps }>
      { children }
    </td>
  );
}
TableCell.propTypes = {
  children: PropTypes.node
};
TableCell.defaultProps = {
  children: null
};
