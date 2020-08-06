import './Sidebar.sass';
import {getWeatherWithCityName} from '@/utils';
import {urlApiWeather} from '@/constants';
import {triggerPopup, weatherData} from '@/redux/actions';

export class Sidebar {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'sidebar';

    this.sidebar.addEventListener('keypress', event => {
      const $target = event.target;

      if ($target.dataset.type === 'input') {
        if (event.key === 'Enter') {
          const cityName = $target.value;
          this.response(urlApiWeather, cityName);
        }
      }
    });

    this.sidebar.addEventListener('mouseup', event => {
      const $target = event.target;

      if ($target.dataset.type === 'search-btn') {
        const input = document.querySelector('input#city');
        const cityName = input.value.trim();

        if (cityName) {
          this.response(urlApiWeather, cityName);
        } else {
          input.focus();
          throw new Error('City name is empty, input city name');
        }
      }
    });
  }

  render() {
    this.$root.append(this.sidebar);
    this.sidebar.innerHTML = this.createHTML();
  }

  create() {
    this.render();
  }

  response(url, cityName) {
    getWeatherWithCityName(url, cityName)
        .then(data => {
          this.store.dispatch(weatherData(data));
          this.store.dispatch(triggerPopup(), 'openPopup');
        })
        .catch(err => {
          throw new Error(err.message);
        });
  }

  createHTML() {
    return `
      <div class="sidebar__wrap">
        <div class="sidebar__title">Input city name</div>
        <div class="sidebar__form">
          <input class="sidebar__form-input form-control" type="text" id="city" data-type="input" />
          <button class="sidebar__form-btn" data-type="search-btn"></button>
        </div>
        <div class="sidebar__text">Or click on Map</div>
      </div>
    `;
  }
}
