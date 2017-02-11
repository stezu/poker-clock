import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, TableRow, TableCell } from '../../components';
import * as actions from '../../actions';

function renderBreakLevel({ level }) {

  return (
    <TableRow key={ level.id } />
      <TableCell /> // Sort Handle
      <TableCell colSpan="4">{ 'Break' }</TableCell>
      <TableCell /> // Duration
      <TableCell /> // Delete
    </TableRow>
  );
}

function renderPlayLevel({ level }) {

  return (
    <TableRow key={ level.id } />
      <TableCell /> // Sort Handle
      <TableCell /> // Level Number
      <TableCell /> // Small Blind
      <TableCell /> // Big Blind
      <TableCell /> // Ante
      <TableCell /> // Duration
      <TableCell /> // Delete
    </TableRow>
  );
}

function Settings({ levels }) {

  const tableRows = levels.map((level) => {

    if (level.type === 'break') {
      return renderBreakLevel(level);
    }

    return renderPlayLevel(level);
  });

  return (
    <Table className="settings">
      { tableRows }
    </Table>
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
