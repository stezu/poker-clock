import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Clock, Controls } from '../../components';
import { getRemainingTime, getLevelsForDisplay } from '../../modules';
import './Timer.scss';

function startLevel(actions, level) {

  if (level) {
    actions.startTimer(level);

    return;
  }

  actions.resetTimer();
}

class Timer extends PureComponent {
  static propTypes = {
    timer: PropTypes.shape({
      startTime: PropTypes.number,
      duration: PropTypes.number,
      elapsedTime: PropTypes.number,
      paused: PropTypes.bool,
      started: PropTypes.bool
    }).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    levels: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentLevel: PropTypes.number.isRequired
  };

  remainingTime = 0;
  displayLevels = {};

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
    const { timer, actions } = this.props;

    if (!timer.started) {
      startLevel(actions, this.displayLevels.current);

      return;
    }

    actions.resumeTimer();
  }

  handlePrev() {
    const { actions } = this.props;

    actions.decrementLevel();
    startLevel(actions, this.displayLevels.previous);
  }

  handleNext() {
    const { actions } = this.props;

    actions.incrementLevel();
    startLevel(actions, this.displayLevels.next);
  }

  handleTimeEnd() {
    const { actions } = this.props;

    // Increment the level, then start timer for the current level (which is now correct)
    actions.incrementLevel();
    startLevel(actions, this.displayLevels.current);
  }

  calculateRemainingTime() {
    const { timer } = this.props;
    const now = timer.paused ?
      timer.startTime + timer.elapsedTime :
      Date.now();

    return getRemainingTime({
      start: timer.startTime,
      duration: timer.duration,
      now
    });
  }

  updateRemainingTime() {
    const newTime = this.calculateRemainingTime();

    // Only update the component when the remaining time actually changes
    if (this.remainingTime !== newTime) {
      this.remainingTime = newTime;

      this.forceUpdate();
    }
  }

  componentDidMount() {

    const animate = () => {
      const { timer } = this.props;

      if (!timer.paused) {
        this.updateRemainingTime();

        if (this.remainingTime < 0) {
          this.handleTimeEnd();
        }
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
    const { timer, levels, currentLevel } = this.props;

    this.remainingTime = this.calculateRemainingTime();
    this.displayLevels = getLevelsForDisplay(levels, currentLevel);

    return (
      <section className="timer">
        <Clock
          remainingTime={ this.remainingTime }
          totalTime={ timer.duration }
        />
        <Controls
          paused={ timer.paused }
          onPause={ this.handlePause }
          onResume={ this.handleResume }
          onPrev={ this.handlePrev }
          onNext={ this.handleNext }
          hasPrevLevel={ !!this.displayLevels.previous }
          hasNextLevel={ !!this.displayLevels.next }
        />
      </section>
    );
  }
}

const mapStateToProps = ({ timer, levels, currentLevel }) => ({
  timer,
  levels,
  currentLevel
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
