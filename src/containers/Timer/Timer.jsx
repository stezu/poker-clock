import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Clock, Controls } from '../../components';
import { getRemainingTime, getLevelsForDisplay } from '../../modules';
import './Timer.scss';

function startLevel(actionCreators, level) {

  if (level) {
    actionCreators.startTimer(level);

    return;
  }

  actionCreators.resetTimer();
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
    actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
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
    const { actionCreators } = this.props;

    actionCreators.pauseTimer();
  }

  handleResume() {
    const { timer, actionCreators } = this.props;

    if (!timer.started) {
      startLevel(actionCreators, this.displayLevels.current);

      return;
    }

    actionCreators.resumeTimer();
  }

  handlePrev() {
    const { actionCreators } = this.props;

    actionCreators.decrementLevel();
    startLevel(actionCreators, this.displayLevels.previous);
  }

  handleNext() {
    const { actionCreators } = this.props;

    actionCreators.incrementLevel();
    startLevel(actionCreators, this.displayLevels.next);
  }

  handleTimeEnd() {
    const { actionCreators } = this.props;

    actionCreators.incrementLevel();
    startLevel(actionCreators, this.displayLevels.next);
  }

  updateRemainingTime({ startTime, duration }) {
    const newTime = getRemainingTime({
      start: startTime,
      duration,
      now: Date.now()
    });

    // Only udpate the component when the remaining time actually changes
    if (this.remainingTime !== newTime) {
      this.remainingTime = newTime;

      this.forceUpdate();
    }
  }

  componentDidMount() {

    const animate = () => {
      const { timer } = this.props;

      if (!timer.paused) {
        this.updateRemainingTime(timer);

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

    this.displayLevels = getLevelsForDisplay(levels, currentLevel);

    return (
      <section className="timer">
        <Clock remainingTime={ this.remainingTime } totalTime={ timer.duration } />
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
  actionCreators: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
