import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, LevelEditor } from '../../components';
import * as actions from '../../actions';
import './Settings.scss';

function Settings({ actionCreators, levels }) {

  function handleButtonClick(buttonType) {

    return () => {

      if (buttonType === 'play') {
        actionCreators.addLevel();
      } else {
        actionCreators.addBreak();
      }

      // TODO: scroll to bottom
    };
  }

  return (
    <section className="poker-settings">
      <LevelEditor levels={ levels } actionCreators={ actionCreators } />
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
  actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({ levels }) => ({
  levels
});

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
