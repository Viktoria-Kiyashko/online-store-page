

import { ProductsList } from './Components/ProductsList';
import { Cart } from './Components/Cart';
import { AppComponent } from './interfaces/Component';

export class App implements AppComponent {
  private productsList: ProductsList;
  private cart: Cart; 

  constructor() {
    this.productsList = new ProductsList();
    this.cart = new Cart();
  }

  render() {
    return `
    <div class="container">
      <div class="row">
        <div class="col-5">
          ${this.cart.render()} <!-- Используем cart здесь -->
        </div>
        <div class="col-7">
          ${this.productsList.render()}
        </div>
      </div>
    </div>
    `;
  }

  updateDOM() {
    const container = document.getElementById('app-container'); // Убедитесь, что у вас есть контейнер с ID 'app-container'
    if (container) {
      container.innerHTML = this.render(); // Обновляем содержимое контейнера
      this.addEvents(); // Добавляем события после обновления DOM
    } else {
      console.error('Container with ID app-container not found.');
    }
  }

  addEvents() {
    this.cart.addEvents(); // Добавляем события для корзины
    this.productsList.addEvents(); // Добавляем события для списка продуктов
  }
}



