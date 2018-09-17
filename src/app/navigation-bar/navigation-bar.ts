// import * as styles from './navigation-bar.scss';

export default class NavigationBarComponent {
  public el!: HTMLElement;

  constructor() {

    this.render();
  }

  protected render(): void {
    // Create external nav
    this.el = document.createElement('nav');
    this.el.classList.add(/*styles.navigationBarComponent,*/
      'navbar', 'navbar-toggleable-md', 'navbar-inverse', 'bg-primary', 'fixed-top');

    // Items
    const itemList = document.createElement('ul');
    itemList.classList.add('navbar-nav', 'mr-auto');

    const navItem = document.createElement('li');
    navItem.classList.add('nav-item');

    const navLink = document.createElement('a');
    navLink.classList.add('nav-link');
    navLink.appendChild(document.createTextNode('d3.js demo'));

    navItem.appendChild(navLink);
    itemList.appendChild(navItem);
    this.el.appendChild(itemList);
  }
}
