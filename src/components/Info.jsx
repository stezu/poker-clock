import React, { PropTypes, Component } from 'react';

// Get the previous, current and next levels from the state store
function getLevelsForDisplay(state) {
  const initialState = {
    previous: undefined,
    current: undefined,
    next: undefined
  };

  const levels = state.reduce((memo, level) => {

    if (level.current) {
      memo.current = level;
    } else if (memo.current && !memo.next) {
      memo.next = level;
    } else if (!memo.current) {
      memo.previous = level;
    }

    return memo;
  }, initialState);

  return levels.current ? levels : initialState;
}

export default class Info extends Component {
  static propTypes = {
    levels: PropTypes.array.isRequired
  };

  renderLevel(level = {}, position) {

    return (
      <div className={ `level level--${ position }` }>
        <div className="level__ante">{ level.ante ? level.ante : '-'  }</div>
        <div className="level__small-blind">{ level.smallBlind ? level.smallBlind : '-' }</div>
        <div className="level__big-blind">{ level.bigBlind ? level.bigBlind : '-' }</div>
      </div>
    );
  }

  render() {
    const { previous, current, next } = getLevelsForDisplay(this.props.levels);

    return (
      <section className="info">
        { this.renderLevel(previous, 'previous') }
        { this.renderLevel(current, 'current') }
        { this.renderLevel(next, 'next') }
      </section>
    );
  }
};
