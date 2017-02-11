import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Timer, LevelInfo, Footer } from '../components';
import * as actions from '../actions';
import { getLevelsForDisplay } from '../modules';
import './App.scss';

function App({ timer, actionCreators, levels, currentLevel }) {
  const displayLevels = getLevelsForDisplay(levels, currentLevel);

  return (
    <div className="poker-clock">
      <div className="poker-clock__primary">
        <Header />
        <Timer
          timer={ timer }
          actions={ actionCreators }
          displayLevels={ displayLevels }
        />
      </div>
      <div className="poker-clock__secondary">
        <LevelInfo displayLevels={ displayLevels } />
        <Footer />
      </div>
    </div>
  );
}
App.propTypes = {
  actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  timer: PropTypes.shape({
    startTime: PropTypes.number,
    duration: PropTypes.number,
    elapsedTime: PropTypes.number,
    paused: PropTypes.bool,
    started: PropTypes.bool
  }).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentLevel: PropTypes.number.isRequired
};

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
)(App);
