export function getWeather(url, coords) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fullUrl = url + `lat=${coords[0]}&lon=${coords[1]}`;

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
  });
}
