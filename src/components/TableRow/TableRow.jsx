import React, { PropTypes } from 'react';

export default function TableRow({ children }) {

  return (
    <tr>
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
