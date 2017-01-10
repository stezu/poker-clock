import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    onStart: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired
  };

  onPlayClick() {
    // const { onStart, onPause, onResume } = this.props;
  }

  renderPrevButton() {
    //
  }

  renderNextButton() {
    //
  }

  renderPlayButton() {
    const { paused } = this.props.timer;

    if (paused) {
      return (
        <button className="play" onClick={ this.onPlayClick.bind(this) }>
          Play
        </button>
      );
    }

    return (
      <button className="play" onClick={ this.onPlayClick.bind(this) }>
        Pause
      </button>
    );
  }

  render() {

    return (
      <section className="controls">
        // { this.renderPrevButton() }
        { this.renderPlayButton() }
        // { this.renderNextButton() }
      </section>
    );
  }
};
