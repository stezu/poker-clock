import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Icon } from '@/components';

import './Header.scss';

function Header({ location }) {
  const settingsOpen = location.pathname.endsWith('/settings');

  return (
    <header className="header">
      <Link
        to={ settingsOpen ? '/' : '/settings' }
        className="settings"
        title={ settingsOpen ? 'Close Settings' : 'Modify Settings' }
      >
        <Icon name={ settingsOpen ? 'close' : 'cog' } size={ 36 } />
      </Link>
    </header>
  );
}

export default withRouter(Header);
