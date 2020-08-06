import * as actionTypes from './types';

export function rootReducer(state, action) {
  let popupOpen;

  switch (action.type) {
    case actionTypes.WEATHER_OF:
      return {
        ...state,
        weatherOf: action.data
      };

    case actionTypes.TRIGGER_POPUP:
      popupOpen = state.popupOpen;

      return {
        ...state,
        popupOpen: !popupOpen
      };

    case actionTypes.WEATHER_DATA:
      return {
        ...state,
        weatherData: action.data
      };

    default:
      return state;
  }
}
