import ymaps from 'ymaps';
import {urlApiWeather, centerMap} from '@/constants';
import {getWeatherWithCoords} from '@utils';
import {triggerPopup, weatherData} from '@/redux/actions';

export class Map {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.map = document.createElement('div');
    this.map.id = 'map';

    ymaps
        .load()
        .then(maps => {
          const myMap = new maps.Map('map', {
            center: centerMap,
            zoom: 3
          });

          myMap.events.add('click', (event) => {
            const coords = event.get('coords');

            getWeatherWithCoords(urlApiWeather, coords)
                .then(data => {
                  this.store.dispatch(weatherData(data));
                  this.store.dispatch(triggerPopup(), 'openPopup');
                })
                .catch(err => {
                  throw new Error(err);
                });
          });
        })
        .catch(err => {
          throw new Error(`Failed to load Yandex Maps ${err}`);
        });
  }

  render() {
    this.$root.append(this.map);
  }

  create() {
    this.render();
  }
}
