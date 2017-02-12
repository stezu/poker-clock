// Allow an anonymous arrow function here because react-sortable-hoc
// does not pass the correct context to this component
/* eslint-disable react/jsx-no-bind, new-cap */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Table, TableRow, TableCell } from '../../components';
import { formatTime, getBlindString } from '../../modules';
import * as actions from '../../actions';
import './Settings.scss';

const DragHandle = SortableHandle(() =>
  <span className="sort-grip" />
);

const SortableItem = SortableElement(({ level }) => {

  if (level.type === 'break') {
    return (
      <TableRow cellCount={ 7 }>
        <TableCell key="sort"><DragHandle /></TableCell>
        <TableCell key="break" colSpan={ 4 }>{ 'Break' }</TableCell>
        <TableCell key="duration">{ formatTime(level.duration) }</TableCell>
        <TableCell key="delete">{ 'X' }</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow cellCount={ 7 }>
      <TableCell key="sort"><DragHandle /></TableCell>
      <TableCell key="number">{ level.number }</TableCell>
      <TableCell key="smallBlind">{ getBlindString(level.smallBlind) }</TableCell>
      <TableCell key="bigBlind">{ getBlindString(level.bigBlind) }</TableCell>
      <TableCell key="ante">{ getBlindString(level.ante) }</TableCell>
      <TableCell key="duration">{ formatTime(level.duration) }</TableCell>
      <TableCell key="delete">{ 'X' }</TableCell>
    </TableRow>
  );
});

const SortableList = SortableContainer(({ levels }) => {

  const sortableLevels = levels.map((level, index) =>
    <SortableItem key={ `${level.id}` } level={ level } index={ index } />
  );

  return (
    <Table>{ sortableLevels }</Table>
  );
});

function Settings({ actionCreators, levels }) {

  return (
    <section className="poker-settings">
      <SortableList
        levels={ levels }
        onSortEnd={ ({ oldIndex, newIndex }) => actionCreators.editPosition(oldIndex, newIndex) }
        useDragHandle
      />
    </section>
  );
}
Settings.propTypes = {
  actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
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
