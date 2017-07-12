import React, { Component } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Premise from './Premise';

export default class extends Component {
  hasChildren(premisePk) {
    return this.props.allPremises.filter(
      ({ parent }) => parent === premisePk
    ).length > 0;
  }

  getOffset() {
    const { current, premises } = this.props;

    const [currentPremise] = premises
      .map(
        (premise, index) => ({
          ...premise,
          index,
        })
      ).filter(
        ({ pk }) => pk === current
      );

    return currentPremise ? currentPremise.index : 0;
  }

  render() {
    const { visible, premises } = this.props;
    return (
      <div className={
        classNames({
          siblings: true,
          visible,
        })
      }>
        {
          premises.map(
            (premise, index) =>
              <Premise
                offset={ index === 0 && this.getOffset() }
                key={ premise.pk }
                hasChildren={ this.hasChildren(premise.pk) }
                { ...premise }
              />
          )
        }
        <style jsx global>{`
          .siblings {
            position: absolute;
            bottom: -100%;
            height: 100%;
            width: 100%;
            transition: all 700ms;
            overflow: hidden;
            white-space: nowrap;
          }

          .visible {
            bottom: 0;
          }
        `}</style>
      </div>
    );
  }
}
