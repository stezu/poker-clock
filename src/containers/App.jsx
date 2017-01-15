import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import LevelInfo from '../components/LevelInfo';
import Footer from '../components/Footer';
import * as actions from '../actions';
import { getLevelsForDisplay } from '../modules';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    timer: PropTypes.object.isRequired,
    levels: PropTypes.array.isRequired
  };

  render() {
    const { timer, actions, levels, currentLevel } = this.props;
    const displayLevels = getLevelsForDisplay(levels, currentLevel);

    return (
      <div className="poker-clock">
        <Header />
        <Timer
          timer={ timer }
          actions={ actions }
          displayLevels={ displayLevels }
        />
        <LevelInfo displayLevels={ displayLevels } />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ timer, levels, currentLevel }) => ({
  timer,
  levels,
  currentLevel
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
