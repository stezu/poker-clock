import React, { PropTypes, Component } from 'react';

export default class BreakLevel extends Component {
  static propTypes = {
    position: PropTypes.string.isRequired
  };

  render() {
    const { position } = this.props;

    return (
      <div className={ `level level--break level--${ position }` }>
        <div className="level__break">Break</div>
      </div>
    );
  }
};
