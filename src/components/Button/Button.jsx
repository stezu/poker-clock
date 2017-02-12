import React, { PropTypes } from 'react';
import './Button.scss';

export default function Button({ children, onClick, clickProps, ...restProps }) {

  function handleClick() {
    onClick(...clickProps);
  }

  return (
    <button
      className="button"
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
  clickProps: PropTypes.array
};
Button.defaultProps = {
  children: null,
  clickProps: []
};
