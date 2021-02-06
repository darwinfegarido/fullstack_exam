
const initialState = {
  isCounterPage: false,
  item: null,
}

const rootReducer = (state = initialState, { type, payload, isBack }) => {
  switch (type) {
    case "TOGGLE":
      return { isCounterPage:  !state.isCounterPage, item: payload, isBack};
    default:
      return state
  }
}

module.exports = rootReducer;
