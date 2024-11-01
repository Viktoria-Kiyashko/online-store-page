// ProductItem.ts


import { AppComponent } from "../../interfaces/Component";
import { Product } from "../../interfaces/Product";
import { appStore } from "../../Store/AppStore"; // Импортируем appStore

export class ProductItem implements AppComponent {
  constructor(private product: Product) {}

  private getHtmlID = () => `product_${this.product.id}`;

  render() {
    return `
      <div class="card" style="width: 18rem; margin: 1em;">
        <img src="${this.product.image}" alt="${this.product.name}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${this.product.name}</h5>
          <p class="card-text">$${this.product.price}</p>
          <a href="#" class="btn btn-primary" id="${this.getHtmlID()}">BUY</a>
        </div>
      </div>
    `;
  }

  addEvents() {
    const button = document.getElementById(this.getHtmlID());
    if (!button) {
        console.warn(`Button with ID ${this.getHtmlID()} is not found. Retrying...`);
        setTimeout(() => this.addEvents(), 100);
        return; // Выходим из метода
    }

    // Убираем предыдущий обработчик, если он существует
    button.removeEventListener('click', this.onClick.bind(this)); 
    
    // Добавляем новый обработчик
    button.addEventListener('click', this.onClick.bind(this));
}

private onClick(event: Event) {
    event.preventDefault(); // Отменяем стандартное поведение ссылки
    appStore.addProduct(this.product); // Используем appStore для добавления продукта в корзину
}
}




