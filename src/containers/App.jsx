import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import LevelInfo from '../components/LevelInfo';
import Footer from '../components/Footer';
import * as actions from '../actions';
import { getLevelsForDisplay } from '../modules';

function App({ timer, actionCreators, levels, currentLevel }) {
  const displayLevels = getLevelsForDisplay(levels, currentLevel);

  return (
    <div className="poker-clock">
      <Header />
      <Timer
        timer={ timer }
        actions={ actionCreators }
        displayLevels={ displayLevels }
      />
      <LevelInfo displayLevels={ displayLevels } />
      <Footer />
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
