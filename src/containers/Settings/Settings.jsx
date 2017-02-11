import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell } from '../../components';
import * as actions from '../../actions';
import './Settings.scss';

function Settings({ levels }) {

  const tableRows = levels.map((level) => {

    if (level.type === 'break') {
      return (
        <TableRow key={ level.id }>
          <TableCell key="sort">{ '=' }</TableCell>
          <TableCell key="break" colSpan="4">{ 'Break' }</TableCell>
          <TableCell key="duration">{ level.duration }</TableCell>
          <TableCell key="delete">{ 'X' }</TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow key={ level.id }>
        <TableCell key="sort">{ '=' }</TableCell>
        <TableCell key="number">{ level.number }</TableCell>
        <TableCell key="smallBlind">{ level.smallBlind }</TableCell>
        <TableCell key="bigBlind">{ level.bigBlind }</TableCell>
        <TableCell key="ante">{ level.ante }</TableCell>
        <TableCell key="duration">{ level.duration }</TableCell>
        <TableCell key="delete">{ 'X' }</TableCell>
      </TableRow>
    );
  });

  return (
    <section className="poker-settings">
      <Table>{ tableRows }</Table>
    </section>
  );
}
Settings.propTypes = {
  // actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired
  // currentLevel: PropTypes.number.isRequired
};

const mapStateToProps = ({ levels, currentLevel }) => ({
  levels,
  currentLevel
});

const mapDispatchToProps = (dispatch) => ({
  actionCreators: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
