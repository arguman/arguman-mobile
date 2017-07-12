import React, { Component } from 'react';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'

import Layout from '../components/Layout';
import ContentionList from '../components/ContentionList';

import { initStore } from '../store';

class About extends Component {
  render () {
    return (
      <Layout title='About'>
        about
      </Layout>
    );
  }
}

export default withRedux(initStore, null, null)(About);
