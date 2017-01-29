import React from 'react';
import './Header.scss';

export default function Header() {

  return (
    <header className="header">
      <a href="#">{ 'LOGO' }</a>
      <button>{ 'COG' }</button>
    </header>
  );
}
