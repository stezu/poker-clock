import React, { PropTypes, PureComponent } from 'react';
import { formatTime, getSecondsFromTime } from '../../modules';
import './DurationEditor.scss';

export default class DurationEditor extends PureComponent {
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

    onChange(...changeProps, getSecondsFromTime(target.value));
  }

  render() {
    const { className, value } = this.props;

    return (
      <input
        className={ `duration-editor ${className}` }
        defaultValue={ formatTime(value) }
        onChange={ this.handleChange }
        type="tel"
      />
    );
  }
}
