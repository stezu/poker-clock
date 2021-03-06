import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, LevelEditor } from '../../components';
import * as actionCreators from '../../actions';
import './Settings.scss';

class Settings extends PureComponent {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    levels: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.handleBreakButtonClick = this.handleBreakButtonClick.bind(this);
  }

  levelEditor = null;

  scrollToBottom() {

    // TODO: find a way to do this without a timeout
    setTimeout(() => {
      this.levelEditor.scrollToBottom();
    }, 0);
  }

  handlePlayButtonClick() {
    this.props.actions.addLevel();
    this.scrollToBottom();
  }

  handleBreakButtonClick() {
    this.props.actions.addBreak();
    this.scrollToBottom();
  }

  render() {
    const { actions, levels } = this.props;

    return (
      <section className="poker-settings">
        <LevelEditor
          ref={ (elem) => {
            this.levelEditor = elem;
          } }
          actions={ actions }
          levels={ levels }
        />
        <div className="level-controls">
          <Button className="button--play" onClick={ this.handlePlayButtonClick }>
            { 'Add Level' }
          </Button>
          <Button className="button--break" onClick={ this.handleBreakButtonClick }>
            { 'Add Break' }
          </Button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ levels }) => ({
  levels
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
