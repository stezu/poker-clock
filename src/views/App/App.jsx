import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { rgba } from 'polished';

import { getLevelsForDisplay } from '@/modules';
import { Footer, Header, LevelInfo } from './components';

import './App.scss';

const Container = styled.div`
  display: flex;
  height: 100%;
  text-align: center;

  ${({ theme }) => theme.media.vertical} {
    flex-direction: column;
  }
`;

const Primary = styled.div`
  background: ${({ theme }) => rgba(theme.colors.accent, 0.1)};
  background-image: radial-gradient(ellipse at 50% 0%, ${({ theme }) => rgba(theme.colors.accent, 0.2)} 10%, transparent 100%);
  display: flex;
  flex: 1 1 50%;
  flex-direction: column;
  overflow: hidden;
`;

const Secondary = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px 20px 0;
  position: relative;

  @media ${({ theme }) => theme.media.vertical} {
    min-height: 185px;
  }

  &::before {
    top: 5%;
    border-radius: 50%;
    box-shadow: 0 0 30px 20px ${({ theme }) => rgba(theme.colors.black, 0.5)};
    content: '';
    height: 90%;
    left: -20px;
    position: absolute;
    width: 15px;

    @media ${({ theme }) => theme.media.vertical} {
      height: 15px;
      top: -20px;
      left: 5%;
      width: 90%;
    }
  }
`;

function App({ children, levels, currentLevel }) {
  const displayLevels = getLevelsForDisplay(levels, currentLevel);

  return (
    <Container>
      <Primary>
        <Header />
        { children }
      </Primary>
      <Secondary>
        <LevelInfo displayLevels={ displayLevels } />
        <Footer />
      </Secondary>
    </Container>
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
