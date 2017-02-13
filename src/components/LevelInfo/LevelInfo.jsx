import React, { PropTypes, PureComponent } from 'react';
import { BreakLevel, PlayLevel } from '../';
import './LevelInfo.scss';

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
      return <BreakLevel key={ level.id } position={ position } />;
    }

    return (
      <PlayLevel
        key={ level.id }
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
