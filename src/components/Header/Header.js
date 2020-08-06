import './Header.sass';
import {weatherOf} from '@/redux/actions';

export class Header {
  constructor(root, store) {
    this.$root = root;
    this.store = store;

    this.init();
  }

  init() {
    this.header = document.createElement('div');
    this.header.className = 'header';

    this.header.addEventListener('click', event => {
      const $target = event.target;

      if ($target.dataset.type === 'weather-period-btn') {
        const weatherPeriod = $target.dataset.weatherPeriod;

        this.store.dispatch(weatherOf(weatherPeriod), 'changeDatetime');
      }
    });

    this.store.subscribe(() => this.render(), 'changeDatetime');
  }

  render() {
    this.header.innerHTML = this.createHTML();
    this.$root.append(this.header);
  }

  create() {
    this.render();
  }

  createHTML() {
    const weatherOf = this.store.getState().weatherOf;

    return `
      <ul class="nav nav-pills">
        <li class="nav-item">
          <button
            class="btn ${weatherOf === 'day' ? 'btn-primary' : 'btn-secondary'} mr-4"
            data-type="weather-period-btn"
            data-weather-period="day"
          >
            Weather of day
          </button>
          <button
            class="btn ${weatherOf === 'three-days' ? 'btn-primary' : 'btn-secondary'} mr-4"
            data-type="weather-period-btn"
            data-weather-period="three-days"
          >
            Weather of three days
          </button>
          <button
            class="btn ${weatherOf === 'five' ? 'btn-primary' : 'btn-secondary'} mr-2"
            data-type="weather-period-btn"
            data-weather-period="five"
          >
            Weather of five days
          </button>
        </li>
      </ul>
    `;
  }
}
