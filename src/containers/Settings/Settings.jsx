import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Table, TableRow, TableCell } from '../../components';
import * as actions from '../../actions';
import './Settings.scss';

const SortableItem = SortableElement(({ level }) => { // eslint-disable-line new-cap

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

const SortableList = SortableContainer(({ levels }) => { // eslint-disable-line new-cap

  const sortableLevels = levels.map((level, index) =>
    <SortableItem key={ `item-${level.id}` } level={ level } index={ index } />
  );

  return (
    <Table>{ sortableLevels }</Table>
  );
});

function handleSortEnd() {
  global.console.log('done sorting');
}

function Settings({ levels }) {

  return (
    <section className="poker-settings">
      <SortableList levels={ levels } onSortEnd={ handleSortEnd } />
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
