import React, { PropTypes, Component } from 'react';
import Clock from './Clock';
import Controls from './Controls';

export default class Timer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  handleStart(duration) {
    this.props.actions.startTimer({
      duration
    });
  }

  handlePause() {
    this.props.actions.pauseTimer();
  }

  handleResume() {
    this.props.actions.resumeTimer();
  }

  render() {
    const { timer, actions } = this.props;

    // TODO: this is bad apparently
    function handleTimeEnd() {
      actions.incrementLevel();
    }

    return (
      <section className="timer">
        <Clock timer={ timer } onTimeEnd={ handleTimeEnd } />
        <Controls
          timer={ timer }
          onStart={ this.handleStart }
          onPause={ this.handlePause }
          onResume={ this.handleResume }
        />
      </section>
    );
  }
};
