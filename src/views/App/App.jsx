import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Footer, Header, LevelInfo } from './components';
import { getLevelsForDisplay } from '@/modules';

import './App.scss';

function App({ children, levels, currentLevel }) {
  const displayLevels = getLevelsForDisplay(levels, currentLevel);

  return (
    <div className="poker-clock">
      <div className="poker-clock__primary">
        <Header />
        { children }
      </div>
      <div className="poker-clock__secondary">
        <LevelInfo displayLevels={ displayLevels } />
        <Footer />
      </div>
    </div>
  );
}
App.propTypes = {
  children: PropTypes.node.isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentLevel: PropTypes.number.isRequired
};

const mapStateToProps = ({ timer, levels, currentLevel }) => ({
  timer,
  levels,
  currentLevel
});

export default connect(mapStateToProps)(App);
