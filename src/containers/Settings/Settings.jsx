// Allow an anonymous arrow function here because react-sortable-hoc
// does not pass the correct context to this component
/* eslint-disable react/jsx-no-bind, new-cap */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LevelEditor } from '../../components';
import * as actions from '../../actions';
import './Settings.scss';

function Settings({ actionCreators, levels }) {

  return (
    <section className="poker-settings">
      <LevelEditor
        levels={ levels }
        actionCreators={ actionCreators }
      />
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
