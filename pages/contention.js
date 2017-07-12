import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'

import Layout from '../components/Layout';
import ContentionHeader from '../components/ContentionHeader';
import PremiseSiblings from '../components/PremiseSiblings';
import StoryBoard from '../components/StoryBoard';

import {
  initStore,
  fetchContentionDetail,
  setCurrentPremise,
} from '../store';

class ContentionDetail extends Component {
  static async getInitialProps ({
    query: { slug, premiseId },
    isServer,
    store
  }) {

    if (isServer) {
      await store.dispatch(fetchContentionDetail(slug));
    }

    return {
      slug,
      premiseId:
        premiseId
          ? Number(premiseId)
          : null,
      isServer,
    };
  }

  constructor(props) {
    super(props);

    this.goToNextPremise = this.goToNextPremise.bind(this);
    this.goToPrevPremise = this.goToPrevPremise.bind(this);
    this.goToParentPremise = this.goToParentPremise.bind(this);
    this.goToChildPremise = this.goToChildPremise.bind(this);
  }

  componentWillMount() {
    if (!this.props.isServer) {
      this.props.fetchContentionDetail(this.props.slug);
    }
  }

  goToPremise(premiseId) {
    const { slug } = this.props;
    let route;

    if (premiseId) {
      route = [
        `/contention?slug=${slug}&premiseId=${premiseId}`,
        `/arguments/${slug}?premiseId=${premiseId}`
      ];
    } else {
      route = [
        `/contention?slug=${slug}`,
        `/arguments/${slug}`
      ];
    }

    Router.replace(...route);
  }

  goToNextPremise() {
    const {
      premises,
      premiseId
    } = this.props;

    const siblings = this.findSiblings(premises, premiseId);

    const premiseIndex =
      siblings.findIndex(
        ({ pk }) => pk === premiseId
      );

    const premise = siblings[premiseIndex + 1];

    if (premise) {
      this.goToPremise(premise.pk);
    }
  }

  goToPrevPremise() {
    const {
      premises,
      premiseId
    } = this.props;

    const siblings = this.findSiblings(premises, premiseId);

    const premiseIndex =
      siblings.findIndex(
        ({ pk }) => pk === premiseId
      );

    const premise = siblings[premiseIndex - 1];

    if (premise) {
      this.goToPremise(premise.pk);
    } else {
      Router.push('/');
    }
  }

  goToParentPremise() {
    const { premises, premiseId } = this.props;

    const [premise] = premises.filter(
      ({ pk }) => pk === premiseId
    );

    if (premise) {
      this.goToPremise(premise.parent)
    };
  }

  goToChildPremise() {
    const { premiseId, premises } = this.props;

    const [premise] = premises.filter(
      ({ parent }) => parent === premiseId
    );

    if (premise) {
      this.goToPremise(premise.pk);
    }
  }

  findSiblings(premises, premiseId) {
    const [premise] = premises.filter(
      ({ pk }) => pk === premiseId
    );

    const parent =
      premise
        ? premise.parent
        : null;

    return premises.filter(
      premise => (
        premise.parent === parent
      )
    );
  }

  render () {
    const { premiseId, contention, premises, loading } = this.props;
    const showHeader = !premiseId;

    let siblings = [];

    if (!loading) {
      siblings = this.findSiblings(premises, premiseId);
    }

    return (
      <Layout title={ contention.title }>
        <ContentionHeader
          setCurrentPremise={ this.props.setCurrentPremise }
          contention={ contention }
          visible={ showHeader }
          premises={ premises }
        />
        <StoryBoard
          transition={ !showHeader }
          goToNext={ this.goToNextPremise }
          goToPrev={ this.goToPrevPremise }
          goToParent={ this.goToParentPremise }
          goToChild={ this.goToChildPremise }
        >
          <PremiseSiblings
            premises={ siblings }
            current={ premiseId }
            visible={ !showHeader }
            allPremises={ premises }
           />
        </StoryBoard>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContentionDetail: bindActionCreators(fetchContentionDetail, dispatch),
    setCurrentPremise: bindActionCreators(setCurrentPremise, dispatch),
  };
};

const mapStateToProps = ({
  current: {
    premiseId,
    loading,
    premises,
    contention,
  },
}) => {
  return {
    // premiseId,
    premises,
    contention,
    loading,
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ContentionDetail);
