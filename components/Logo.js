import React, { Component } from 'react';
import Link from 'next/link';

export default () => (
  <div className={ 'logo' }>
    <Link prefetch href={ '/' }><a>a</a></Link>
    <style jsx>{`
      a {
        width: 50px;
        height: 50px;
        background: #fff5ba;
        display: inline-block;
        border-radius: 5px;
        font-size: 2.7em;
        text-align: center;
      }

      .logo {
        margin-left: 20px;
        margin-top: 20px;
      }
    `}</style>
  </div>
);
