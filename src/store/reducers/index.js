import Immutable from 'seamless-immutable';

export function msg (state = Immutable({}), action) {
  return action.type === 'UPDATE_MSG' && typeof action.text === 'string' ?
    Immutable({ ...state, msg: action.text }) :
    state;
}

export function zomato (state = Immutable({}), action) {
  if (action.type === 'ZOMATO') {
    const oldData = state[action.endpoint] !== 'undefined' ?
      state[action.endpoint] :
      [];

    return Immutable({
      [action.endpoint]: [
        ...oldData,
        ...action.data,
      ]
    });
  }

  return state;
}
