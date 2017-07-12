import 'isomorphic-fetch';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  contentions: [],
  current: {
    loading: false,
    premiseId: null,
    contention: {
      supportRate: 50.0,
      title: null,
    },
    premises: []
  },
  scrollOffset: 0,
};

export const actionTypes = {
  FETCH_CONTENTIONS: 'FETCH_CONTENTIONS',
  SET_CONTENTIONS: 'SET_CONTENTIONS',
  SET_CURRENT_CONTENTION: 'SET_CURRENT_CONTENTION',
  SET_CURRENT_PREMISE: 'SET_CURRENT_PREMISE',
  REQUEST_CONTENTION_DETAIL: 'REQUEST_CONTENTION_DETAIL',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
};

const flattenPremises = (
  node,
  parent = null,
  initial = []
) => (
  node.reduce(
    (prev, { children, ...current}) => [
      ...prev,
      {
        ...current,
        parent,
        children,
        children_count: children.length,
      },
      ...flattenPremises(children, current.pk),
    ],
    initial
  )
);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTENTIONS:
      return {
        ...state,
        contentions: [
          ...state.contentions,
          ...action.payload.contentions,
        ],
      };

    case actionTypes.REQUEST_CONTENTION_DETAIL:
      // set as partially if it's already loaded
      let result;

      const [cached] = state.contentions.filter(
        contention => contention.slug === action.payload.slug
      );

      if (cached) {
        result = {
          ...state.current.contention,
          title: cached.title,
          supportRate: cached.support_rate
        };
      }

      return {
        ...state,
        current: {
          ...state.current,
          contention: result,
          premises: [],
          premiseId: null,
          loading: true,
        },
      };

    case actionTypes.SET_CURRENT_CONTENTION:
      const {
        contention: {
          premises,
          ...contention,
        },
      } = action.payload;

      return {
        ...state,
        current: {
          ...state.current,
          premises: flattenPremises(premises),
          contention,
          loading: false,
        },
      };

    case actionTypes.SET_CURRENT_PREMISE:
      return {
        ...state,
        current: {
          ...state.current,
          premiseId: action.payload.premiseId,
        },
      };

    case actionTypes.SET_CURSOR_OFFSET:
      return {
        ...state,
        scrollOffset: action.payload.scrollOffset,
      };

    default: {
      return state;
    }
  }
}

function slugify({ absolute_url }) {
  const parts = absolute_url.split('/');
  return parts[parts.length - 1];
}

export const fetchContentions = (offset = 0) => async (dispatch) => {
  const response = await fetch(
    `//en.arguman.org/featured.json?offset=${offset}`
  );

  const { contentions } = await response.json();

  return dispatch(
    setContentions(
      contentions.map(
        contention => ({
          ...contention,
          slug: slugify(contention)
        })
      )
    )
  );
}

export const fetchContentionDetail = (slug) => async (dispatch) => {
  dispatch(requestContentionDetail(slug));

  const response = await fetch(
    `//en.arguman.org/${slug}.json`
  );

  const {
    nodes: {
      children: premises,
      name: title,
      support_rate: supportRate,
      user,
    },
  } = await response.json();

  return (
    dispatch(
      setCurrentContention({
        title,
        premises,
        supportRate,
        user,
      })
    )
  );
};

export const setContentions = contentions => {
  return {
    type: actionTypes.SET_CONTENTIONS,
    payload: {
      contentions,
    },
  };
};

export const setCurrentContention = contention => {
  return {
    type: actionTypes.SET_CURRENT_CONTENTION,
    payload: {
      contention,
    },
  };
};

export const setCurrentPremise = premiseId => {
  return {
    type: actionTypes.SET_CURRENT_PREMISE,
    payload: {
      premiseId,
    },
  };
};

export const requestContentionDetail = (slug) => {
  return {
    type: actionTypes.REQUEST_CONTENTION_DETAIL,
    payload: {
      slug,
    },
  };
};

export const setScrollOffset = offset => {
  return {
    type: actionTypes.SET_SCROLL_OFFSET,
    payload: {
      scrollOffset,
    },
  };
};

export const initStore = (state = initialState) => {
  return createStore(reducer, state, applyMiddleware(thunkMiddleware));
};
