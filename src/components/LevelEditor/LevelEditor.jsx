// Allow an anonymous arrow function here because react-sortable-hoc
// does not pass the correct context to this component
/* eslint-disable react/jsx-no-bind, new-cap */

import React, { PropTypes } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Table, TableRow, TableCell } from '../';
import { formatTime, getBlindString } from '../../modules';

const DragHandle = SortableHandle(() =>
  <span className="sort-grip" />
);

const SortableItem = SortableElement(({ level }) => {
  const cellCount = 11;

  if (level.type === 'break') {
    return (
      <TableRow cellCount={ cellCount }>
        <TableCell key="sort"><DragHandle /></TableCell>
        <TableCell key="break" colSpan={ 7 }>{ 'Break' }</TableCell>
        <TableCell key="duration" colSpan={ 2 }>{ formatTime(level.duration) }</TableCell>
        <TableCell key="delete">{ 'X' }</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow cellCount={ cellCount }>
      <TableCell key="sort"><DragHandle /></TableCell>
      <TableCell key="number">{ level.number }</TableCell>
      <TableCell key="smallBlind" colSpan={ 2 }>{ getBlindString(level.smallBlind) }</TableCell>
      <TableCell key="bigBlind" colSpan={ 2 }>{ getBlindString(level.bigBlind) }</TableCell>
      <TableCell key="ante" colSpan={ 2 }>{ getBlindString(level.ante) }</TableCell>
      <TableCell key="duration" colSpan={ 2 }>{ formatTime(level.duration) }</TableCell>
      <TableCell key="delete">{ 'X' }</TableCell>
    </TableRow>
  );
});

const SortableList = SortableContainer(({ levels }) => {

  const sortableLevels = levels.map((level, index) =>
    <SortableItem key={ level.id } level={ level } index={ index } />
  );

  return (
    <Table>{ sortableLevels }</Table>
  );
});

export default function LevelEditor({ actionCreators, levels }) {

  return (
    <SortableList
      className="level-editor"
      levels={ levels }
      onSortEnd={ ({ oldIndex, newIndex }) => actionCreators.editPosition(oldIndex, newIndex) }
      useDragHandle
    />
  );
}
LevelEditor.propTypes = {
  actionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired
};
