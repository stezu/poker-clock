import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Info from '../components/Info';
import * as actions from '../actions';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    timer: PropTypes.object.isRequired,
    levels: PropTypes.array.isRequired
  };

  render() {
    const { timer, actions, levels } = this.props;

    return (
      <div>
        <Header />
        <Timer timer={ timer } actions={ actions } />
        <Info levels={ levels } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer,
  levels: state.levels
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
