import {urlApiWeather} from '@/constants';
import {getWeather} from '@utils';
import {Popup} from '@components/Popup/Popup';

export class Map {
  constructor(root, id) {
    this.$root = root;
    this.id = id;
  }

  render() {
    const map = document.createElement('div');
    map.id = this.id;
    this.$root.append(map);

    const popup = new Popup(this.$root, 'popup');
    popup.create();

    const initMap = () => {
      const myMap = new ymaps.Map('map', {
        center: [47.63465150, 14.64557591],
        zoom: 3
      });

      myMap.events.add('click', (event) => {
        const coords = event.get('coords');

        getWeather(urlApiWeather, coords)
            .then(data => {
              console.log(data);
            })
            .catch(err => {
              console.error(err);
            });
      });
    };

    ymaps.ready(initMap);
  }

  create() {
    this.render();
  }
}
