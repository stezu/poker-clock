import React from 'react';

import './Footer.scss';

export default function Footer() {

  return (
    <footer className="footer">
      { 'Made with ' }
      <span className="accent-heart">{ '❤' }</span>
      { '︎ by ' }
      <a href="https://github.com/stezu">{ 'Stephen Zuniga' }</a>
    </footer>
  );
}
