import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getBlindString } from '@/modules';

import './BlindEditor.scss';

export default class BlindEditor extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    changeProps: PropTypes.arrayOf(PropTypes.any)
  };
  static defaultProps = {
    className: '',
    value: 0,
    changeProps: []
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { onChange, changeProps } = this.props;

    onChange(...changeProps, target.value);
  }

  render() {
    const { className, value } = this.props;

    return (
      <input
        className={ `blind-editor ${className}` }
        defaultValue={ getBlindString(value) }
        onChange={ this.handleChange }
        type="number"
        inputMode="numeric"
        min="0"
        max="100000000"
        step="1"
      />
    );
  }
}
