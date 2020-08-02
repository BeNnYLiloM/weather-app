export class Popup {
  constructor(root, className) {
    this.$root = root;
    this.className = className;
  }

  render() {
    const popup = document.createElement('div');
    const popupBody = document.createElement('div');
    popup.className = this.className;
    popupBody.className = this.className + '__body';

    popup.append(popupBody);

    this.$root.append(popup);
  }

  create() {
    this.render();
  }

  open() {

  }
}
