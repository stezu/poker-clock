import { injectGlobal } from 'react-emotion';
import { normalize, rgba } from 'polished';

import theme from './theme';

export default function globalStyles() {
  injectGlobal`
    ${normalize()};

    * {
      box-sizing: border-box;
    }

    img {
      height: auto;
      max-width: 100%;
    }

    svg,
    embed,
    iframe,
    object,
    video {
      max-width: 100%;
    }

    html,
    body {
      background: ${theme.colors.background};
      background-image: linear-gradient(transparent, ${rgba(theme.colors.accent, 0.2)});
      color: ${theme.colors.text};
      font-family: 'Arial', sans-serif;
      font-size: 16px;
      height: 100%;
      line-height: 1.5;
    }

    #root {
      height: 100%;
    }

    a {
      border-bottom: 1px solid currentColor;
      color: ${theme.colors.link};
      outline: none;
      text-decoration: none;
      transition: background 150ms, border-color 250ms, color 250ms, opacity 250ms;

      &:hover,
      &:focus {
        color: ${theme.colors.linkHover};
      }
    }

    p:first-child {
      margin-top: 0;
    }

    p:last-child {
      margin-bottom: 0;
    }

    svg {
      fill: currentColor;
    }
  `;
}
