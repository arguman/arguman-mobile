import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

function format(value) {
  const fixed = value.toFixed(0);

  if (value > 50) {
    return `${fixed}% support rate`;
  }

  if (value < 50) {
    return `${fixed}% objection rate`;
  }

  return `neutral objection/support`;
}

export default ({ value }) => (
  <div>
    { format(value) }
  </div>
);
