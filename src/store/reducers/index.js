import Immutable from 'seamless-immutable';

export function msg (state = Immutable({}), action) {
  return action.type === 'UPDATE_MSG' && typeof action.text === 'string' ?
    Immutable({ ...state, msg: action.text }) :
    state;
}

export function zomato (state = Immutable({}), action) {
  if (action && action.type === 'ZOMATO') {
    const oldData = state[action.endpoint] !== 'undefined' ?
      state[action.endpoint] :
      {};

    if ([ 'search', 'reviews' ].indexOf(action.endpoint) === -1 )
      return Immutable({
        ...state,
        [action.endpoint]: oldData.merge(action.data),
      });

    if (['reviews'].indexOf(action.endpoint) !== -1) {
      let oldReviews;
      try {
        oldReviews = oldData[action.city][action.data.restaurant];
      } catch (err) {
        oldReviews = {};
      }

      return Immutable({
        ...state,
        [action.endpoint]: {
          ...oldData,
          [action.city]: {
            ...oldData[action.city],
            [action.data.restaurant]: {
              ...oldReviews,
              ...action.data[action.city][action.data.restaurant],
            },
          }
        }
      });
    }

    return Immutable({
      ...state,
      [action.endpoint]: {
        ...oldData,
        [action.city]: {
          ...oldData[action.city],
          ...action.data[action.city],
        }
      }
    });
  }

  return state;
}
