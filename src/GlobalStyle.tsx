import React from 'react';
import { Global, css } from "@emotion/react";

const style = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

  * {
    font-family: 'Pretendard';
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export const GlobalStyle = () => <Global styles={style} />