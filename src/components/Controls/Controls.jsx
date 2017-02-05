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
      <button className="prev" disabled={ disabled } onClick={ onPrev }>{ 'Prev' }</button>
    );
  }

  renderNextButton() {
    const { onNext, hasNextLevel } = this.props;
    const disabled = !hasNextLevel;

    return (
      <button className="next" disabled={ disabled } onClick={ onNext }>{ 'Next' }</button>
    );
  }

  renderPlayButton() {
    const { onResume, onPause, paused } = this.props;

    if (paused) {
      return (
        <button className="play" onClick={ onResume }>{ 'Play' }</button>
      );
    }

    return (
      <button className="play" onClick={ onPause }>{ 'Pause' }</button>
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
