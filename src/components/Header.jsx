import React, { PropTypes, Component } from 'react';

export default class Header extends Component {
  static propTypes = {
    levels: PropTypes.array.isRequired
  };

  render() {

    return (
      <header className="header">
        <a href="#">LOGO</a>
        <button>COG</button>
      </header>
    );
  }
};
