import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import Premise from './Premise';
import { createGhostNode, on, off } from '../bokPusur';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ghostElement: null,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchStop = this.touchStop.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }

  componentDidMount() {
    on('keydown', this.onKeyDown);
    on('touchstart', this.touchStart);
    on('touchend', this.touchStop);
    on('touchmove', this.touchMove);
  }

  componentWillUnmount() {
    off('keydown', this.onKeyDown);
    off('touchstart', this.touchStart);
    off('touchend', this.touchStop);
    off('touchmove', this.touchMove);
  }

  touchStart({ touches }) {
    const {
      clientX: x,
      clientY: y,
    } = touches.item(0);

    this.setState({
      touchStart: {
        x,
        y,
      },
    });
  }

  touchMove(event) {
    const {
      clientX: x,
      clientY: y,
    } = event.touches.item(0);

    const threshold = 40;
    const { touchStart } = this.state;
    const diffY = y - touchStart.y;
    const diffX = x - touchStart.x;

    if (Math.abs(diffY) > threshold) {
      this.setState({
        slide:
          diffY > 0
            ? 'up'
            : 'down'
      });
    }

    if (Math.abs(diffX) > threshold) {
      this.setState({
        slide:
          diffX > 0
            ? 'prev'
            : 'next'
      });
    }

    event.preventDefault();
  }

  touchStop(event) {
    switch (this.state.slide) {
      case 'prev':
        this.props.goToPrev();
        break;

      case 'next':
        this.props.goToNext();
        break;

      case 'up':
        this.slideWithGhost('up', this.props.goToParent);
        break;

      case 'down':
        this.slideWithGhost('down', this.props.goToChild);
        break;
    }

    this.setState({
      slide: null,
    });
  }

  onKeyDown({ code }) {
    switch (code) {
      case 'ArrowUp':
        return (
          this.slideWithGhost(
            'up',
            this.props.goToParent
          )
        );

      case 'ArrowDown':
        return (
          this.slideWithGhost(
            'down',
            this.props.goToChild
          )
        );

      case 'ArrowLeft':
        return this.props.goToPrev();

      case 'ArrowRight':
        return this.props.goToNext();
    }
  }

  slideWithGhost(direction, callback) {
    return createGhostNode(
      this.ghost,
      this.canvas,
      direction,
      this.props.transition,
      callback
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div className={ 'storyBoard' }>
        <div
          className={ 'canvas' }
          ref={ ref => this.canvas = ref }
        >{ children }</div>
        <div
          ref={ ref => this.ghost = ref }
          className={ 'ghost' }
        />
        <style jsx>{`
          .storyBoard {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            zIndex: 9;
          }

          .ghost {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0%;
            transition: 200ms;
            display: none;
          }

          .canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0%;
            transition: 200ms;
          }

          .up {
            top: -100%;
          }

          .visible {
            top: 0%;
          }
        `}</style>
      </div>
    );
  }
}
