import React, { Component } from 'react';
import Link from 'next/link';

export default ({ offset }) => (
  <div className={ 'loadMore' }>
    <Link prefetch href={ `/?offset=${ offset + 20 }` }>
      <a>Load More</a>
    </Link>
    <style jsx>{`
      .loadMore {
        text-align: center;
        font-size: 2em;
        padding: 15px 20px 30px;
      }

      .loadMore a:active {
        color: red;
      }
    `}</style>
  </div>
);
