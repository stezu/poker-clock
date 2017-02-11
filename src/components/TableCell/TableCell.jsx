import React, { PropTypes } from 'react';

export default function TableCell({ children, ...restProps }) {

  return (
    <td { ...restProps }>
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
