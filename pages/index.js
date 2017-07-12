import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'

import Layout from '../components/Layout';
import ContentionList from '../components/ContentionList';
import Logo from '../components/Logo';
import LoadMore from '../components/LoadMore';

import { initStore, fetchContentions } from '../store';

class Home extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: {
      offset = 0,
    }
  }) {
    if (isServer) {
      await store.dispatch(fetchContentions(offset));
    }

    return {
      isServer,
      offset: parseInt(offset)
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.offset !== this.props.offset) {
      this.fetch();
    }
  }

  componentWillMount() {
    if (!this.props.isServer) {
      this.fetch();
    }
  }

  fetch() {
    this.props.fetchContentions(this.props.offset);
  }

  render () {
    const { contentions, offset } = this.props;

    return (
      <Layout title='Argüman'>
        <Logo />
        <ContentionList contentions={ contentions } />
        <LoadMore offset={ offset } />
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContentions: bindActionCreators(fetchContentions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    contentions: state.contentions,
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Home);