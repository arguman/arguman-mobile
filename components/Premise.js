import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export default class extends Component {
  render() {
    const {
      name: content,
      premise_type: premiseType,
      hasChildren,
      offset,
      pk,
      user,
    } = this.props;

    let style;

    if (offset) {
      style = {
        marginLeft:
          `calc(-${offset * 100}% + ${offset * 50}px)`
      };
    }

    return (
      <div
        style={ style }
        className={
          classNames('premise', premiseType, {
            hasChildren
          })
        }
      >
        <div className={ classNames('premiseType', premiseType) }>
          { premiseType }
        </div>
        <div className={ 'content' }>
          { content }
          <div className={ 'user' }>
            @{ user.username }
          </div>
        </div>
        <style jsx>{`
          .premise {
            display: inline-block;
            width: calc(100% - 50px);
            height: calc(100% - 20px);
            transition: all 200ms;
            position: relative;
          }

          .but .content {
            background: #ffdddb;
          }

          .because .content {
            background: #f0ffe8;
          }

          .however .content {
            background: #fffadb;
          }

          .content {
            padding: 10px;
            height: calc(100% - 52px);
            border-top: 2px solid #181818;
            box-sizing: border-box;
            white-space: normal;
            font-size: 1.1em;
            letter-spacing: 0.01em;
            line-height: 1.3em;
            margin: 0 0 0 15px;
            width: calc(100% - 15px);
            float: left;
            color: #444444;
          }

          .premiseType {
            box-sizing: border-box;
            text-transform: uppercase;
            height: 50px;
            width: 100px;
            margin-left: 50%;
            border-left: 2px solid #181818;
            padding: 25px 10px;
          }

          .premise.hasChildren .content {
            border-bottom: 2px solid #181818;
            height: calc(100% - 50px);
          }

          .premise.hasChildren:after {
            content: "";
            display: inline-block;
            width: 2px;
            height: 20px;
            background: #181818;
            margin-left: calc(-50%);
            top: 100%;
            position: absolute;
          }

          .user {
            position: absolute;
            bottom: 10px;
            right: 10px;
            text-align: right;
            font-size: 1em;
          }
        `}</style>
      </div>
    );
  }
}
