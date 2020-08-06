export function objIsEmpty(obj) {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    return false;
  }
  return true;
}

export function getWeatherWithCoords(url, coords) {
  return request({
    type: 'coords',
    coords,
    url
  });
}

export function getWeatherWithCityName(url, cityName) {
  return request({
    type: 'city',
    cityName,
    url
  });
}

function request(options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let fullUrl = null;

    switch (options.type) {
      case 'city':
        fullUrl = options.url + `q=${options.cityName}`;
        break;
      case 'coords':
        fullUrl = options.url + `lat=${options.coords[0]}&lon=${options.coords[1]}`;
        break;
      default:
        throw new Error('Undefined options.type');
    }

    if (fullUrl) {
      xhr.open('GET', fullUrl);

      xhr.responseType = 'json';

      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject(xhr.response);
      };

      xhr.send();
    } else {
      throw new Error('Full url is not be null');
    }
  });
}
