import * as actionTypes from './types';

export function weatherOf(data) {
  return {
    type: actionTypes.WEATHER_OF,
    data
  };
}

export function triggerPopup() {
  return {
    type: actionTypes.TRIGGER_POPUP
  };
}

export function weatherData(data) {
  return {
    type: actionTypes.WEATHER_DATA,
    data
  };
}
