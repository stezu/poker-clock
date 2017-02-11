import React, { PropTypes } from 'react';
import { COG } from '../../constants/icons';
import './Header.scss';

export default function Header({ onClickSettings }) {

  return (
    <header className="header">
      <button
        className="settings"
        onClick={ onClickSettings }
        title="Modify Settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 340.274 340.274"
        >
          <path d={ COG } />
        </svg>
      </button>
    </header>
  );
}
Header.propTypes = {
  onClickSettings: PropTypes.func.isRequired
};
