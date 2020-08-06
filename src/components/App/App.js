import {Map} from '@components/Map/Map';
// import {Header} from '@components/Header/Header';
import {WeatherApp} from '@/core/WeatherApp';
import {Popup} from '@components/Popup/Popup';
import {createStore} from '@/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {initialState} from '@/redux/initialState';
import {Sidebar} from '@components/Sidebar/Sidebar';
import {Header} from '@components/Header/Header';

export class App {
  constructor(selector) {
    this.$root = document.getElementById(selector);

    this.init();
  }

  init() {
    const store = createStore(rootReducer, initialState);

    this.weatherApp = new WeatherApp({
      components: [Map, Header, Popup, Sidebar],
      root: this.$root,
      store
    });

    this.weatherApp.init();
  }
}
