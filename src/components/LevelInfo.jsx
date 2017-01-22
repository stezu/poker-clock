import React, { PropTypes, PureComponent } from 'react';
import BreakLevel from './levels/BreakLevel';
import PlayLevel from './levels/PlayLevel';

export default class LevelInfo extends PureComponent {
  static propTypes = {
    displayLevels: PropTypes.shape({
      previous: PropTypes.object,
      current: PropTypes.object,
      next: PropTypes.object
    }).isRequired
  };

  renderLevel(position) {
    const level = this.props.displayLevels[position] || {};

    if (level.type === 'break') {
      return <BreakLevel position={ position } />;
    }

    return (
      <PlayLevel
        position={ position }
        ante={ level.ante }
        smallBlind={ level.smallBlind }
        bigBlind={ level.bigBlind }
      />
    );
  }

  render() {

    return (
      <section className="level-info">
        { this.renderLevel('previous') }
        { this.renderLevel('current') }
        { this.renderLevel('next') }
      </section>
    );
  }
}
