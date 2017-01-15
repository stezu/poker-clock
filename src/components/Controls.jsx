import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
  static propTypes = {
    paused: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired
  };

  renderPrevButton(onPrev) {

    return (
      <button className="prev" onClick={ onPrev }>
        Prev
      </button>
    );
  }

  renderNextButton(onNext) {

    return (
      <button className="next" onClick={ onNext }>
        Next
      </button>
    );
  }

  renderPlayButton(onPause, onResume, paused) {

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
    const { paused, onPause, onResume, onNext, onPrev } = this.props;

    return (
      <section className="controls">
        { this.renderPrevButton(onPrev) }
        { this.renderPlayButton(onPause, onResume, paused) }
        { this.renderNextButton(onNext) }
      </section>
    );
  }
};
