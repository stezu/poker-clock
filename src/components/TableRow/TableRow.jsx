import React, { PropTypes } from 'react';
import './TableRow.scss';

export default function TableRow({ children }) {

  return (
    <tr className="table__row">
      { children }
    </tr>
  );
}
TableRow.propTypes = {
  children: PropTypes.node
};
TableRow.defaultProps = {
  children: null
};
