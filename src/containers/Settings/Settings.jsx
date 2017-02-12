// Allow an anonymous arrow function here because react-sortable-hoc
// does not pass the correct context to this component
/* eslint-disable react/jsx-no-bind, new-cap */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Table, TableRow, TableCell } from '../../components';
import * as actions from '../../actions';
import './Settings.scss';

const DragHandle = SortableHandle(({ ...props }) =>
  <TableCell key="sort" { ...props }>{ '=' }</TableCell>
);

const SortableItem = SortableElement(({ level }) => {

  if (level.type === 'break') {
    return (
      <TableRow key={ level.id } cellCount={ 7 }>
        <DragHandle />
        <TableCell key="break" colSpan={ 4 }>{ 'Break' }</TableCell>
        <TableCell key="duration">{ level.duration }</TableCell>
        <TableCell key="delete">{ 'X' }</TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={ level.id } cellCount={ 7 }>
      <DragHandle />
      <TableCell key="number">{ level.number }</TableCell>
      <TableCell key="smallBlind">{ level.smallBlind }</TableCell>
      <TableCell key="bigBlind">{ level.bigBlind }</TableCell>
      <TableCell key="ante">{ level.ante }</TableCell>
      <TableCell key="duration">{ level.duration }</TableCell>
      <TableCell key="delete">{ 'X' }</TableCell>
    </TableRow>
  );
});

const SortableList = SortableContainer(({ levels }) => {

  const sortableLevels = levels.map((level, index) =>
    <SortableItem key={ `item-${level.id}` } level={ level } index={ index } />
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
