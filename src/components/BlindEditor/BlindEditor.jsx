import React, { PropTypes } from 'react';
import { getBlindString } from '../../modules';
import './BlindEditor.scss';

export default function BlindEditor({ value, onChange, changeProps }) {

  function handleChange(...args) {
    onChange(...changeProps, ...args);
  }

  return (
    <input
      className="blind-editor"
      defaultValue={ getBlindString(value) }
      onChange={ handleChange }
      type="number"
      inputMode="numeric"
      min="0"
      max="100000000"
      step="1"
    />
  );
}
BlindEditor.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  changeProps: PropTypes.arrayOf(PropTypes.any)
};
BlindEditor.defaultProps = {
  value: 0,
  changeProps: []
};
