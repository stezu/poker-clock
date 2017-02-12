import React from 'react';
import { browserHistory, Link } from 'react-router';
import { CLOSE, COG } from '../../constants/icons';
import './Header.scss';

export default function Header() {
  const settingsOpen = browserHistory.getCurrentLocation().pathname === '/settings';

  return (
    <header className="header">
      <Link
        to={ settingsOpen ?
          '/' :
          '/settings'
        }
        className="settings"
        title={ settingsOpen ?
          'Close Settings' :
          'Modify Settings'
        }
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
        >
          <path
            d={ settingsOpen ?
              CLOSE :
              COG
            }
          />
        </svg>
      </Link>
    </header>
  );
}
