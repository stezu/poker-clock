import React, { PropTypes, Component } from 'react';
import Clock from './Clock';
import Controls from './Controls';
import { getRemainingTime } from '../modules';

function startLevel(actions, level) {

  if (level) {
    return actions.startTimer(level);
  }

  actions.resetTimer();
}

export default class Timer extends Component {
  static propTypes = {
    timer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    displayLevels: PropTypes.object.isRequired
  };

  remainingTime = {};

  handlePause(actions) {
    actions.pauseTimer();
  }

  handleResume(actions, currentLevel, isStarted) {

    if (!isStarted) {
      return startLevel(actions, currentLevel);
    }

    actions.resumeTimer();
  }

  handlePrev(actions, prevLevel) {
    actions.decrementLevel();
    startLevel(actions, prevLevel);
  }

  handleNext(actions, nextLevel) {
    actions.incrementLevel();
    startLevel(actions, nextLevel);
  }

  handleTimeEnd(actions, nextLevel) {
    actions.incrementLevel();
    startLevel(actions, nextLevel);
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
    const { timer, actions, displayLevels } = this.props;

    return (
      <section className="timer">
        <Clock remainingTime={ this.remainingTime } />
        <Controls
          paused={ timer.paused }
          onPause={ this.handlePause.bind(this, actions) }
          onResume={ this.handleResume.bind(this, actions, displayLevels.current, timer.started) }
          onPrev={ this.handlePrev.bind(this, actions, displayLevels.previous) }
          onNext={ this.handleNext.bind(this, actions, displayLevels.next) }
          prevLevel={ displayLevels.previous }
          nextLevel={ displayLevels.next }
        />
      </section>
    );
  }
};
