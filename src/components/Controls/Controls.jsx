import React, { PropTypes, PureComponent } from 'react';
import { Button, Icon } from '../';
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
      <Button
        disabled={ disabled }
        onClick={ onPrev }
        title="Skip to Previous Level"
      >
        <Icon name="prev" size={ 36 } />
      </Button>
    );
  }

  renderNextButton() {
    const { onNext, hasNextLevel } = this.props;
    const disabled = !hasNextLevel;

    return (
      <Button
        disabled={ disabled }
        onClick={ onNext }
        title="Skip to Next Level"
      >
        <Icon name="next" size={ 36 } />
      </Button>
    );
  }

  renderPlayButton() {
    const { onResume, onPause, paused } = this.props;

    return (
      <Button
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
        <Icon
          name={ paused ?
            'play' :
            'pause'
          }
          size={ 36 }
        />
      </Button>
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
