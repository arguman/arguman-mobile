import { connect } from 'react-redux'
import Link from 'next/link';

import SupportRate from './SupportRate';

export default ({
  contentions,
}) => {
  return (
    <ul>
      {
        contentions.map(
          ({ title, id, slug, support_rate }) => (
            <li key={ id }>
              <Link
                as={`/arguments/${slug}`}
                href={`/contention?slug=${slug}`}
              ><a>{ title }</a></Link>
              <div className={ 'supportRate' }>
                <SupportRate value={ support_rate } />
              </div>
            </li>
          )
        )
      }
      <style>{`
        ul {
          margin: 20px;
          padding: 0;
        }

        li {
          padding: 5px 2px;
          list-style: none;
          font-size: 1.4em;
          margin-bottom: 20px;
        }

        a {
          color: black;
          text-decoration: none;
        }

        .supportRate {
          font-size: 0.8em;
          color: gray;
        }
      `}</style>
    </ul>
  );
};
