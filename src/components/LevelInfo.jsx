import React, { PropTypes, Component } from 'react';
import BreakLevel from './levels/BreakLevel';
import PlayLevel from './levels/PlayLevel';

export default class LevelInfo extends Component {
  static propTypes = {
    displayLevels: PropTypes.object.isRequired
  };

  renderLevel(level = {}, position) {

    if (level.type === 'break') {
      return <BreakLevel position={ position } />;
    }

    return <PlayLevel
      position={ position }
      ante={ level.ante }
      smallBlind={ level.smallBlind }
      bigBlind={ level.bigBlind }
    />;
  }

  render() {
    const { previous, current, next } = this.props.displayLevels;

    return (
      <section className="level-info">
        { this.renderLevel(previous, 'previous') }
        { this.renderLevel(current, 'current') }
        { this.renderLevel(next, 'next') }
      </section>
    );
  }
};
