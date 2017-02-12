import React, { PropTypes } from 'react';
import './Table.scss';

export default function Table({ children }) {

  return (
    <div className="table">
      { children }
    </div>
  );
}
Table.propTypes = {
  children: PropTypes.node
};
Table.defaultProps = {
  children: null
};
