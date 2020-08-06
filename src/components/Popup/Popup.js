import './Popup.sass';
import {objIsEmpty} from '@/utils';
import {months} from '@/constants';
import {triggerPopup} from '@/redux/actions';

export class Popup {
  constructor(root, store) {
    this.$root = root;
    this.store = store;
    this.days = {};

    this.init();
  }

  init() {
    this.popup = document.createElement('div');
    this.popup.className = 'popup';

    this.popup.addEventListener('mouseup', event => {
      if (!event.target.closest('.popup__body')) {
        this.store.dispatch(triggerPopup(), 'closePopup');
      }
    });

    this.store.subscribe(() => this.open(), 'openPopup');
    this.store.subscribe(() => this.destroy(), 'closePopup');
  }

  render() {
    const weatherData = this.store.getState().weatherData;

    if (!objIsEmpty(weatherData)) {
      this.popup.innerHTML = this.createPopupBody(weatherData);
    }
    this.$root.append(this.popup);
  }

  create() {
    this.render();
  }

  open() {
    this.popup.classList.add('_open');
    this.render();
  }

  createPopupBody(obj) {
    const {city: {name: location}} = obj;

    obj.list.forEach(el => {
      const date = new Date(el.dt_txt);
      const day = date.getDate();
      const month = date.getMonth();

      this.days[`${day} ${months[month]}`] = this.days[`${day} ${months[month]}`] || [];

      this.days[`${day} ${months[month]}`].push(el);
    });

    const tabDaysNav = this.createTabNav(this.days);

    return `
      <div class="popup__body">
        <div class="card">
          <div class="card-body">
            <h5 class="h4 card-title text-center mb-3">${location}</h5>
            <div class="card-weather">
              ${tabDaysNav}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createTabNav() {
    const tabNavItems = [];
    const tabBodyItems = [];
    const days = Object.keys(this.days);
    const weatherOf = this.store.getState().weatherOf;

    if (weatherOf === 'day') {
      tabNavItems.push(this.createTabNavItem(days[0], 0));
      tabBodyItems.push(this.createTabBodyItem(days[0], 0));
    } else if (weatherOf === 'three-days') {
      for (let i = 0; i < 3; i++) {
        tabNavItems.push(this.createTabNavItem(days[i], i));
        tabBodyItems.push(this.createTabBodyItem(days[i], i));
      }
    } else {
      days.forEach((key, index) => {
        tabNavItems.push(this.createTabNavItem(key, index));
        tabBodyItems.push(this.createTabBodyItem(key, index));
      });
    }

    return `
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          ${tabNavItems.join('')}
        </ul>
        <div class="tab-content" id="myTabContent">
          ${tabBodyItems.join('')}
        </div>
      </div>
    `;
  }

  createTabNavItem(date, index) {
    return `
      <li class="nav-item" role="presentation">
        <a
          class="nav-link ${index === 0 ? 'active' : ''}"
          id="day${index}-tab"
          data-toggle="tab"
          href="#day${index}"
          role="tab"
          aria-controls="home"
          aria-selected="${index === 0 ? 'true' : 'false'}"
        >
          ${date}
        </a>
      </li>
    `;
  }

  createTabBodyItem(key, index) {
    const tabBodyInner = [];

    this.days[key].forEach(el => {
      tabBodyInner.push(this.createTabBodyInner(el));
    });

    return `
      <div
        class="tab-pane fade ${index === 0 ? 'show active' : ''}"
        id="day${index}"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        <div class="popup__weather">
          <div class="popup__weather-img"></div>
          <ul class="list-group">
            ${tabBodyInner.join('')}
          </ul>
        </div>
      </div>
    `;
  }

  createTabBodyInner(el) {
    const time = new Date(el.dt_txt).toLocaleTimeString();
    const {main: {temp}} = el;

    return `
      <li class="list-group-item">
        <div class="h5">Time: ${time}</div>
        <div class="d-flex align-items-baseline">
          Temperature: <div class="h5 ml-2">${temp}</div>
        </div>
      </li>
    `;
  }

  destroy() {
    for (const prop of Object.keys(this.days)) {
      delete this.days[prop];
    }
    this.popup.classList.remove('_open');
  }
}
