import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, LevelEditor } from '../../components';
import * as actionCreators from '../../actions';
import './Settings.scss';

function Settings({ actions, levels }) {

  function handleButtonClick(buttonType) {

    return () => {

      if (buttonType === 'play') {
        actions.addLevel();
      } else {
        actions.addBreak();
      }

      // TODO: scroll to bottom
    };
  }

  return (
    <section className="poker-settings">
      <LevelEditor levels={ levels } actions={ actions } />
      <div className="level-controls">
        <Button className="button--play" onClick={ handleButtonClick('play') }>
          { 'Add Level' }
        </Button>
        <Button className="button--break" onClick={ handleButtonClick('break') }>
          { 'Add Break' }
        </Button>
      </div>
    </section>
  );
}
Settings.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired
};

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
