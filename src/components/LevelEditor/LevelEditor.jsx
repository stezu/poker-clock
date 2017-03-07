// Allow an anonymous arrow function here because react-sortable-hoc
// does not pass the correct context to this component
/* eslint-disable react/jsx-no-bind, new-cap, max-statements */

import React, { PropTypes, PureComponent } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
// import { SortableHandle } from 'react-sortable-hoc';
import { BlindEditor, Button, Icon } from '../';
import { capitalizeString, formatTime } from '../../modules';

// const DragHandle = <span className="sort-grip" />;

// const SortableItem = SortableElement(({
//   level,
//   onRemoveLevel,
//   onAnteChange,
//   onSmallBlindChange,
//   onBigBlindChange
// }) => {
//   const cellCount = 11;

//   if (level.type === 'break') {
//     return (
//       <TableRow cellCount={ cellCount }>
//         <TableCell key="sort"><DragHandle key="sort" /></TableCell>
//         <TableCell key="break" colSpan={ 7 }>{ 'Break' }</TableCell>
//         <TableCell key="duration" colSpan={ 2 }>{ formatTime(level.duration) }</TableCell>
//         <TableCell key="delete">
//           <Button
//             onClick={ onRemoveLevel }
//             clickProps={ [level.id] }
//             title="Remove Level"
//             tabIndex="-1"
//           >
//             <Icon
//               name="close"
//               style={ {
//                 fill: '#ff0000'
//               } }
//             />
//           </Button>
//         </TableCell>
//       </TableRow>
//     );
//   }

//   return (
//     <TableRow cellCount={ cellCount }>
//       <TableCell key="sort"><DragHandle key="sort" /></TableCell>
//       <TableCell key="number">{ level.number }</TableCell>
//       <TableCell key="smallBlind" colSpan={ 2 }>
//         <BlindEditor
//           value={ level.smallBlind }
//           onChange={ onSmallBlindChange }
//           changeProps={ [level.id] }
//         />
//       </TableCell>
//       <TableCell key="bigBlind" colSpan={ 2 }>
//         <BlindEditor
//           value={ level.bigBlind }
//           onChange={ onBigBlindChange }
//           changeProps={ [level.id] }
//         />
//       </TableCell>
//       <TableCell key="ante" colSpan={ 2 }>
//         <BlindEditor
//           value={ level.ante }
//           onChange={ onAnteChange }
//           changeProps={ [level.id] }
//         />
//       </TableCell>
//       <TableCell key="duration" colSpan={ 2 }>{ formatTime(level.duration) }</TableCell>
//       <TableCell key="delete">
//         <Button
//           onClick={ onRemoveLevel }
//           clickProps={ [level.id] }
//           title="Remove Level"
//           tabIndex="-1"
//         >
//           <Icon
//             name="close"
//             style={ {
//               fill: '#ff0000'
//             } }
//           />
//         </Button>
//       </TableCell>
//     </TableRow>
//   );
// });

// const SortableList = SortableContainer(({ className, levels, ...itemProps }) => {

//   const sortableLevels = levels.map((level, index) =>
//     <SortableItem
//       key={ level.id }
//       index={ index }
//       level={ level }
//       { ...itemProps }
//     />
//   );

//   return (
//     <Table className={ className }>{ sortableLevels }</Table>
//   );
// });

const columns = [
  'sort',
  'number',
  'smallBlind',
  'bigBlind',
  'ante',
  'duration',
  'delete'
];

export default class LevelEditor extends PureComponent {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    levels: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);

    this.handleSmallBlindChange = this.handleSmallBlindChange.bind(this);
    this.handleBigBlindChange = this.handleBigBlindChange.bind(this);
    this.handleAnteChange = this.handleAnteChange.bind(this);
    this.handleRemoveLevel = this.handleRemoveLevel.bind(this);
    this.renderSmallBlind = this.renderSmallBlind.bind(this);
    this.renderBigBlind = this.renderBigBlind.bind(this);
    this.renderAnte = this.renderAnte.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  handleSmallBlindChange(id, { target }) {
    this.props.actions.editSmallBlind(id, target.value);
  }

  handleBigBlindChange(id, { target }) {
    this.props.actions.editBigBlind(id, target.value);
  }

  handleAnteChange(id, { target }) {
    this.props.actions.editAnte(id, target.value);
  }

  handleRemoveLevel(id) {
    this.props.actions.removeLevel(id);
  }

  static renderSort() {
    return <span className="sort-grip" />;
  }

  static renderNumber({ number }) {
    return number;
  }

  renderSmallBlind({ type, id, smallBlind }) {

    if (type === 'play') {
      return (
        <BlindEditor
          value={ smallBlind }
          onChange={ this.handleSmallBlindChange }
          changeProps={ [id] }
        />
      );
    }

    return null;
  }

  renderBigBlind({ type, id, bigBlind }) {

    if (type === 'play') {
      return (
        <BlindEditor
          value={ bigBlind }
          onChange={ this.handleBigBlindChange }
          changeProps={ [id] }
        />
      );
    }

    return null;
  }

  renderAnte({ type, id, ante }) {

    if (type === 'play') {
      return (
        <BlindEditor
          value={ ante }
          onChange={ this.handleAnteChange }
          changeProps={ [id] }
        />
      );
    }

    return null;
  }

  static renderDuration({ duration }) {
    return formatTime(duration);
  }

  renderDelete({ id }) {

    return (
      <Button
        onClick={ this.handleRemoveLevel }
        clickProps={ [id] }
        title="Remove Level"
        tabIndex="-1"
      >
        <Icon
          name="close"
          style={ {
            fill: '#ff0000'
          } }
        />
      </Button>
    );
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    const level = this.props.levels[rowIndex];
    const column = columns[columnIndex];
    const methodName = `render${capitalizeString(column)}`;
    const renderMethod = this[methodName] || this.constructor[methodName];
    const rowClassName = rowIndex % 2 === 0 ?
      'table-row--even' :
      'table-row--odd';

    return (
      <div
        className={ `table-cell ${rowClassName}` }
        key={ key }
        style={ style }
      >
        { renderMethod(level) }
      </div>
    );
  }

  render() {
    const { levels } = this.props;

    return (
      <div className="level-editor">
        <AutoSizer>
          { ({ height, width }) =>
            <Grid
              cellRenderer={ this.cellRenderer }
              columnCount={ 7 }
              columnWidth={ 100 }
              height={ height }
              rowCount={ levels.length }
              rowHeight={ 30 }
              width={ width }
            />
          }
        </AutoSizer>
      </div>
    );
  }
}
