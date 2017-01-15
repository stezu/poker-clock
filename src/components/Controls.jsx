import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
  static propTypes = {
    paused: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired
  };

  renderPrevButton({ onPrev, prevLevel }) {
    var disabled = !prevLevel;

    return (
      <button className="prev" disabled={ disabled } onClick={ onPrev }>
        Prev
      </button>
    );
  }

  renderNextButton({ onNext, nextLevel }) {
    var disabled = !nextLevel;

    return (
      <button className="next" disabled={ disabled } onClick={ onNext }>
        Next
      </button>
    );
  }

  renderPlayButton({ onPause, onResume, paused }) {

    if (paused) {
      return (
        <button className="play" onClick={ onResume }>
          Play
        </button>
      );
    }

    return (
      <button className="play" onClick={ onPause }>
        Pause
      </button>
    );
  }

  render() {
    const {
      paused,
      onPause,
      onResume,
      onNext,
      onPrev,
      prevLevel,
      nextLevel
    } = this.props;

    return (
      <section className="controls">
        { this.renderPrevButton({ onPrev, prevLevel }) }
        { this.renderPlayButton({ onPause, onResume, paused }) }
        { this.renderNextButton({ onNext, nextLevel }) }
      </section>
    );
  }
};
