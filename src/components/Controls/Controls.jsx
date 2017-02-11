import React, { PureComponent, PropTypes } from 'react';
import { PREV, PLAY, PAUSE, NEXT } from '../../constants/icons';
import './Controls.scss';

export default class Controls extends PureComponent {
  static propTypes = {
    paused: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    hasPrevLevel: PropTypes.bool.isRequired,
    hasNextLevel: PropTypes.bool.isRequired
  };

  renderPrevButton() {
    const { onPrev, hasPrevLevel } = this.props;
    const disabled = !hasPrevLevel;

    return (
      <button
        className="button prev"
        disabled={ disabled }
        onClick={ onPrev }
        title="Skip to Previous Level"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path d={ PREV } />
        </svg>
      </button>
    );
  }

  renderNextButton() {
    const { onNext, hasNextLevel } = this.props;
    const disabled = !hasNextLevel;

    return (
      <button
        className="button next"
        disabled={ disabled }
        onClick={ onNext }
        title="Skip to Next Level"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path d={ NEXT } />
        </svg>
      </button>
    );
  }

  renderPlayButton() {
    const { onResume, onPause, paused } = this.props;

    return (
      <button
        className="button play"
        onClick={ paused ?
          onResume :
          onPause
        }
        title={
          paused ?
          'Play Level' :
          'Pause Level'
        }
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path
            d={ paused ?
              PLAY :
              PAUSE
            }
          />
        </svg>
      </button>
    );
  }

  render() {

    return (
      <section className="controls">
        { this.renderPrevButton() }
        { this.renderPlayButton() }
        { this.renderNextButton() }
      </section>
    );
  }
}
