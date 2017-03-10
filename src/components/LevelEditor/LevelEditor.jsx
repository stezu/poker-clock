/* eslint-disable new-cap */

import React, { PropTypes, PureComponent } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { BlindEditor, Button, DurationEditor, Icon } from '../';
import './LevelEditor.scss';

const DragHandle = SortableHandle(() =>
  <span className="sort-grip" />
);

const SortableItem = SortableElement(({ className, children, ...restProps }) =>
  <div
    className={ className }
    { ...restProps }
  >
    { children }
  </div>
);

const SortableList = SortableContainer(({ setRef, rowRenderer, width, height, levels }) =>
  <List
    ref={ setRef }
    rowRenderer={ rowRenderer }
    height={ height }
    rowCount={ levels.length }
    rowHeight={ 35 }
    width={ width }
  />
);

function getCellClassName(cellName) {
  return `table-cell table-cell--${cellName}`;
}

export default class LevelEditor extends PureComponent {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    levels: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  list = null;

  // eslint-disable-next-line max-statements
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.handleSmallBlindChange = this.handleSmallBlindChange.bind(this);
    this.handleBigBlindChange = this.handleBigBlindChange.bind(this);
    this.handleAnteChange = this.handleAnteChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleRemoveLevel = this.handleRemoveLevel.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
    this.renderBreakLevel = this.renderBreakLevel.bind(this);
    this.renderPlayLevel = this.renderPlayLevel.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  scrollToBottom() {
    this.list.scrollToRow(this.props.levels.length);
  }

  setListRef(elem) {
    this.list = elem;
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

  handleDurationChange(id, { target }) {
    this.props.actions.editDuration(id, target.value);
  }

  handleRemoveLevel(id) {
    this.props.actions.removeLevel(id);

    // Reset the timer so that we don't have any issues of the
    // timer counting down with the wrong duration.
    this.props.actions.resetTimer();
  }

  handleSortEnd({ oldIndex, newIndex }) {

    // Don't dispatch the state change unless
    // the item actually moves.
    if (oldIndex !== newIndex) {
      this.props.actions.editPosition(oldIndex, newIndex);
      this.list.forceUpdateGrid();
    }
  }

  renderBreakLevel({ className, index, style, level }) {
    const { id, duration } = level;

    return (
      <SortableItem
        className={ className }
        key={ id }
        index={ index }
        style={ style }
      >
        <div key="sort" className={ getCellClassName('sort') }>
          <DragHandle />
        </div>
        <div key="break" className={ getCellClassName('break') }>{ 'Break' }</div>
        <DurationEditor
          key="duration"
          className={ getCellClassName('duration') }
          value={ duration }
          onChange={ this.handleDurationChange }
          changeProps={ [id] }
        />
        <div key="delete" className={ getCellClassName('delete') }>
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
        </div>
      </SortableItem>
    );
  }

  renderPlayLevel({ className, index, style, level }) {
    const { id, number, smallBlind, bigBlind, ante, duration } = level;

    return (
      <SortableItem
        className={ className }
        key={ id }
        index={ index }
        style={ style }
      >
        <div key="sort" className={ getCellClassName('sort') }>
          <DragHandle />
        </div>
        <div key="number" className={ getCellClassName('number') }>{ number }</div>
        <BlindEditor
          key="smallBlind"
          className={ getCellClassName('smallBlind') }
          value={ smallBlind }
          onChange={ this.handleSmallBlindChange }
          changeProps={ [id] }
        />
        <BlindEditor
          key="bigBlind"
          className={ getCellClassName('bigBlind') }
          value={ bigBlind }
          onChange={ this.handleBigBlindChange }
          changeProps={ [id] }
        />
        <BlindEditor
          key="ante"
          className={ getCellClassName('ante') }
          value={ ante }
          onChange={ this.handleAnteChange }
          changeProps={ [id] }
        />
        <DurationEditor
          key="duration"
          className={ getCellClassName('duration') }
          value={ duration }
          onChange={ this.handleDurationChange }
          changeProps={ [id] }
        />
        <div key="delete" className={ getCellClassName('delete') }>
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
        </div>
      </SortableItem>
    );
  }

  rowRenderer({ index, style }) {
    const level = this.props.levels[index];
    const className = index % 2 === 0 ?
      'table-row table-row--even' :
      'table-row table-row--odd';
    const renderOptions = {
      className,
      index,
      style,
      level
    };

    if (level.type === 'break') {
      return this.renderBreakLevel(renderOptions);
    }

    return this.renderPlayLevel(renderOptions);
  }

  render() {
    const { levels } = this.props;

    return (
      <div className="level-editor">
        <AutoSizer>
          { ({ height, width }) =>
            <SortableList
              setRef={ this.setListRef }
              rowRenderer={ this.rowRenderer }
              height={ height }
              width={ width }
              levels={ levels }
              onSortEnd={ this.handleSortEnd }
              useDragHandle
            />
          }
        </AutoSizer>
      </div>
    );
  }
}
