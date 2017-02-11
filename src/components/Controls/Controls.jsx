import React, { PureComponent, PropTypes } from 'react';
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
          <path
            d="M12.8 10v7.36L26.6 10v16l-13.8-7.36V26H11V10"
          />
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
          <path
            d="M24.8 10v7.36L11 10v16l13.8-7.36V26h1.8V10"
          />
        </svg>
      </button>
    );
  }

  renderPlayButton() {
    const { onResume, onPause, paused } = this.props;
    const playPath = 'M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28';
    const pausePath = 'M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26';

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
              playPath :
              pausePath
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
