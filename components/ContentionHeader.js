import { connect } from 'react-redux'
import Link from 'next/link';
import classNames from 'classnames';

import SupportRate from './SupportRate';
import Icon from './Icon';

export default ({
  setCurrentPremise,
  visible,
  premises,
  contention: {
    title,
    supportRate,
    user,
  },
}) => {
  let premiseId, firstPremiseType;

  if (premises.length) {
    premiseId = premises[0].id;
    firstPremiseType = premises[0]['premise_type'];
  }

  return (
    <div className={ classNames({
      header: true,
      visible
    }) }>
      <h1 onClick={ () => (setCurrentPremise(premiseId)) }>{ title }</h1>
      <div className={ 'info' }>
        <div className={ 'nav' }>
          <Link prefetch href={ `/` }>
            <a><Icon size={ 30 } type={ 'back' } /></a>
          </Link>
        </div>
        <span className={ 'support-rate' }>
          <SupportRate value={ supportRate } />
        </span>
      </div>
      <style jsx>{`
        h1 {
          font-weight: normal;
          background: #fff;
          order: 2;
          margin: 0;
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 100px 40px;
          font-size: 2em;
          vertical-align: bottom;
        }

        h1:after {
          position: absolute;
          width: 100%;
          height: 2px;
          background: black;
          content: "";
          bottom: 20px;
          left: 0;
        }

        h1:before {
          position: absolute;
          width: 2px;
          height: 20px;
          background: black;
          content: "";
          bottom: 0;
          left: calc(50% - 25px);
        }

        .info {
          flex-grow: 1;
          order: 1;
          background: #fff;
          text-align: center;
        }

        .header {
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: absolute;
          justify-content: space-between;
          top: -100%;
          transition: all 700ms;
          z-index: 10;
        }

        .visible {
          top: 0;
        }

        .support-rate {
          display: block;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 1.1em;
          text-align: left;
          padding: 20px 40px 0;
        }

        .nav {
          text-align: left;
          border-bottom: 2px solid black;
          padding: 20px;
        }

        .nav a {
          color: black;
          border-radius: 5px;
          display: inline-block;
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
};
