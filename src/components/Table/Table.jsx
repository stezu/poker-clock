import React, { PropTypes } from 'react';

export default function Table({ children }) {

  return (
    <table className="table">
      <tbody>
        { children }
      </tbody>
    </table>
  );
}
Table.propTypes = {
  children: PropTypes.node
};
Table.defaultProps = {
  children: null
};
