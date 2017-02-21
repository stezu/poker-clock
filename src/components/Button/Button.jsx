import React, { PropTypes } from 'react';
import './Button.scss';

export default function Button({ children, onClick, clickProps, className, ...restProps }) {

  function handleClick(...args) {
    onClick(...clickProps, ...args);
  }

  return (
    <button
      className={ `button ${className}` }
      onClick={ handleClick }
      { ...restProps }
    >
      { children }
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  clickProps: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string
};
Button.defaultProps = {
  children: null,
  clickProps: [],
  className: ''
};
