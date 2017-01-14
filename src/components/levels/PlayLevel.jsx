import React, { PropTypes, Component } from 'react';

export default class PlayLevel extends Component {
  static propTypes = {
    position: PropTypes.string.isRequired,
    ante: PropTypes.number,
    smallBlind: PropTypes.number,
    bigBlind: PropTypes.number
  };

  render() {
    const { position, ante, smallBlind, bigBlind } = this.props;

    return (
      <div className={ `level level--${ position }` }>
        <div className="level__ante">{ ante ? ante : '-'  }</div>
        <div className="level__small-blind">{ smallBlind ? smallBlind : '-' }</div>
        <div className="level__big-blind">{ bigBlind ? bigBlind : '-' }</div>
      </div>
    );
  }
};
