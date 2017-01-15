import React, { PropTypes, Component } from 'react';
import Clock from './Clock';
import Controls from './Controls';
import { getRemainingTime } from '../modules';

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    nextLevel: PropTypes.object
  };

  remainingTime = {};

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

  handleTimeEnd(actions, nextLevel) {
    actions.incrementLevel();
    actions.startTimer(nextLevel);
  }

  componentDidMount() {

    const animate = () => {
      const { timer, actions, nextLevel } = this.props;

      if (timer.paused) {
        this._interval = requestAnimationFrame(animate);

        return;
      }

      this.remainingTime = getRemainingTime({
        start: timer.startTime,
        duration: timer.duration,
        now: Date.now()
      });

      if (this.remainingTime.total <= 0) {
        this.handleTimeEnd(actions, nextLevel);
      }

      // TODO: instead of forcing an update 12ish times a second, can we instead
      // only update when the time has changed? Does it even matter?
      this.forceUpdate();
      this._interval = requestAnimationFrame(animate);
    };

    animate();
  }

  componentWillUnmount() {

    if (this._interval) {
      cancelAnimationFrame(this._interval);
    }
  }

  render() {
    const { timer, actions, nextLevel } = this.props;

    return (
      <section className="timer">
        <Clock remainingTime={ this.remainingTime } />
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
