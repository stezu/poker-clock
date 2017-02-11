import React, { PropTypes, PureComponent } from 'react';
import { Clock, Controls } from '../';
import { getRemainingTime } from '../../modules';
import './Timer.scss';

function startLevel(actions, level) {

  if (level) {
    actions.startTimer(level);

    return;
  }

  actions.resetTimer();
}

export default class Timer extends PureComponent {
  static propTypes = {
    timer: PropTypes.shape({
      startTime: PropTypes.number,
      duration: PropTypes.number,
      elapsedTime: PropTypes.number,
      paused: PropTypes.bool,
      started: PropTypes.bool
    }).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    displayLevels: PropTypes.shape({
      previous: PropTypes.object,
      current: PropTypes.object,
      next: PropTypes.object
    }).isRequired
  };

  remainingTime = {};

  constructor(props) {
    super(props);

    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleTimeEnd = this.handleTimeEnd.bind(this);
  }

  handlePause() {
    const { actions } = this.props;

    actions.pauseTimer();
  }

  handleResume() {
    const { timer, actions, displayLevels } = this.props;

    if (!timer.started) {
      startLevel(actions, displayLevels.current);

      return;
    }

    actions.resumeTimer();
  }

  handlePrev() {
    const { actions, displayLevels } = this.props;

    actions.decrementLevel();
    startLevel(actions, displayLevels.previous);
  }

  handleNext() {
    const { actions, displayLevels } = this.props;

    actions.incrementLevel();
    startLevel(actions, displayLevels.next);
  }

  handleTimeEnd() {
    const { actions, displayLevels } = this.props;

    actions.incrementLevel();
    startLevel(actions, displayLevels.next);
  }

  updateRemainingTime(newTime) {

    // Only udpate the component when the remaining time actually changes
    if (this.remainingTime.total !== newTime.total) {
      this.remainingTime = newTime;

      this.forceUpdate();
    }
  }

  componentDidMount() {

    const animate = () => {
      const { timer, actions, displayLevels } = this.props;

      if (timer.paused) {
        this.animationInterval = requestAnimationFrame(animate);

        return;
      }

      this.updateRemainingTime(getRemainingTime({
        start: timer.startTime,
        duration: timer.duration,
        now: Date.now()
      }));

      if (this.remainingTime.total < 0) {
        this.handleTimeEnd(actions, displayLevels.next);
      }

      this.animationInterval = requestAnimationFrame(animate);
    };

    animate();
  }

  componentWillUnmount() {

    if (this.animationInterval) {
      cancelAnimationFrame(this.animationInterval);
    }
  }

  render() {
    const { timer, displayLevels } = this.props;

    return (
      <section className="timer">
        <Clock remainingTime={ this.remainingTime } totalTime={ timer.duration / 1000 } />
        <Controls
          paused={ timer.paused }
          onPause={ this.handlePause }
          onResume={ this.handleResume }
          onPrev={ this.handlePrev }
          onNext={ this.handleNext }
          hasPrevLevel={ !!displayLevels.previous }
          hasNextLevel={ !!displayLevels.next }
        />
      </section>
    );
  }
}
