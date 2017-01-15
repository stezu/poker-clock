import React, { PropTypes, Component } from 'react';
import Clock from './Clock';
import Controls from './Controls';

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    nextLevel: PropTypes.object
  };

  handlePause(actions) {
    actions.pauseTimer();
  }

  handleResume(actions, nextLevel, isStarted) {

    if (!isStarted) {
      return actions.startTimer(nextLevel);
    }

    return actions.resumeTimer();
  }

  handleNext(actions) {
    actions.incrementLevel();
  }

  handlePrev(actions) {
    actions.decrementLevel();
  }

  // TODO: this is bad apparently
  handleTimeEnd(actions) {
    // actions.incrementLevel();
  }

  render() {
    const { timer, actions, nextLevel } = this.props;

    return (
      <section className="timer">
        <Clock
          timer={ timer }
          onTimeEnd={ this.handleTimeEnd.bind(this, actions) }
        />
        <Controls
          paused={ timer.paused }
          onPause={ this.handlePause.bind(this, actions) }
          onResume={ this.handleResume.bind(this, actions, nextLevel, timer.started) }
          onNext={ this.handleNext.bind(this, actions) }
          onPrev={ this.handlePrev.bind(this, actions) }
        />
      </section>
    );
  }
};
