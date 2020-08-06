export class WeatherApp {
  constructor(options) {
    this.components = options.components || [];
    this.$root = options.root;
    this.store = options.store;
  }

  init() {
    this.components = this.components.map(Component => {
      const component = new Component(this.$root, this.store);

      return component;
    });

    this.components.forEach(Component => Component.create());
  }
}
