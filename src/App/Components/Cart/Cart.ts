// Cart.ts
import { appStore } from "../../Store/AppStore";
import { CartProducts } from "../../Store/State/State";
import { AppComponent } from "../../interfaces/Component";
import { Product } from "../../interfaces/Product";

export class Cart implements AppComponent {
  private products: CartProducts = {}; // Инициализируем products как пустой объект
  private amount = 0;
  private sum = 0;

  constructor() {
    appStore.$state.subscribe(({ cart }) => {
      this.products = cart.products; // Получаем продукты из состояния
      this.calculateTotals(); // Пересчитываем сумму и количество
      this.render(); // Рендерим обновленный компонент
      this.addEvents(); // Добавляем события после рендеринга
    });
  }

  private calculateTotals() {
    this.amount = Object.values(this.products).reduce((totalAmount, item) => totalAmount + item.amount, 0);
    this.sum = Object.values(this.products).reduce((totalSum, item) => totalSum + (item.product.price * item.amount), 0);
  }

  render() {
    return `
      <div>
        <h2>Cart</h2>
        <ul class="list-group" style="margin-top: 1em;">
          ${Object.values(this.products).map(item => `
            <li class="list-group-item d-flex justify-content-between align-items-start">
              ${item.product.name} - $${item.product.price}
              <button class="btn btn-success increase" data-id="${item.product.id}">+</button>
              <button class="btn btn-danger decrease" data-id="${item.product.id}">-</button>
              <span class="badge bg-primary rounded-pill">${item.amount}</span>
            </li>
          `).join('')}
        </ul>
        <p>
          Summary: ${this.amount} products, $${this.sum}
        </p>
      </div>
    `;
  }

  private updateCart(product: Product, change: number) {
    const currentItem = this.products[product.id];
    if (currentItem) {
      currentItem.amount += change;
      if (currentItem.amount <= 0) {
        delete this.products[product.id];
      }
    } else if (change > 0) {
      this.products[product.id] = { product, amount: change };
    }
    
    appStore.update({ cart: { products: this.products } });
  }

  addEvents() {
    const increaseButtons = document.querySelectorAll('.increase');
    const decreaseButtons = document.querySelectorAll('.decrease');

    increaseButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = (event.currentTarget as HTMLButtonElement).dataset.id;
        const product = Object.values(appStore.$state.getValue().products).find(p => p.id === productId);
        if (product) {
          this.updateCart(product, 1); // Увеличиваем количество на 1
        }
      });
    });

    decreaseButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = (event.currentTarget as HTMLButtonElement).dataset.id;
        const product = Object.values(appStore.$state.getValue().products).find(p => p.id === productId);
        if (product) {
          this.updateCart(product, -1); // Уменьшаем количество на 1
        }
      });
    });
  }
}




