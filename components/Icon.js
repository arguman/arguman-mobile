import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

function renderIcon(type) {
  switch (type) {
    case 'back':
      return (
        <path
          d='M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8
             1.41-1.41-5.58-5.59h12.17v-2z'
        />
      );
  }
}

export default ({ type, size=16 }) => (
  <svg
    viewBox='0 0 24 24'
    preserveAspectRatio='xMidYMid meet'
    style={{
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: size,
      height: size,
    }}
  >
    { renderIcon(type) }
  </svg>
);
