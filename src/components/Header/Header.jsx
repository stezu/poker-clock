import React from 'react';
import { Link } from 'react-router';
import { COG } from '../../constants/icons';
import './Header.scss';

export default function Header() {

  return (
    <header className="header">
      <Link
        to="/settings"
        className="settings"
        title="Modify Settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 340.274 340.274"
        >
          <path d={ COG } />
        </svg>
      </Link>
    </header>
  );
}
