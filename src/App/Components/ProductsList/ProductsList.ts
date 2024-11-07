import { Product } from "../../interfaces/Product"; 
import { ProductItem } from "../ProductItem"; 
import { ProductsModel } from "../../Models/ProductsModel";
import { appStore } from "../../Store/AppStore"; 
import { AppComponent } from "../../interfaces/Component";

export class ProductsList implements AppComponent {
    private loading = false;
    private error: Error | null = null;
    private products: Product[] = [];
    private productsComponents: ProductItem[] = [];

    constructor() {
        this.fetchProducts();

        // Подписываемся на обновления состояния продуктов в appStore
        appStore.$state.subscribe(({ products }) => {
            this.products = products;
            this.productsComponents = this.products.map(product => new ProductItem(product));
            this.updateDOM(); 
            this.loading = false;
            this.error = null;
        });
    }

    fetchProducts(): Promise<void> {
        this.loading = true;
        appStore.update();
        return ProductsModel.getProducts()
            .then((products: Product[] | void) => {
                if (products) {
                    
                    appStore.update({
                        products: products,
                    });
                }
            })
            .catch((error) => {
                this.error = error; // Обработка ошибки
            })
            .finally(() => {
                this.loading = false; 
            });
    }

    render(): string {
        return `
            <h2>Products List</h2>
            <div style="display:flex; flex-wrap:wrap;">
                ${this.productsComponents.map((productItem) => productItem.render()).join('')}
            </div>    
            <div>
                ${this.loading ? `<div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span></div>` : ''}
            </div>
            <div>
                ${this.error ? `<div class="alert alert-danger" role="alert"><p>${this.error.message}</p></div>` : ''}
            </div>    
            <button class="btn btn-primary" type="button" id="prev-button">Prev</button>
            <button class="btn btn-primary" type="button" id="next-button">Next</button>
        `;
    }

    updateDOM() {
        const container = document.getElementById('products-container');

        if (container) {
            container.innerHTML = this.render(); 
            this.addEvents(); 
        } else {
            console.error('Container with ID products-container not found.');
        }
    }

    addEvents() {
        this.productsComponents.forEach(component => component.addEvents());
        this.addNavigationEvents();
    }

    private addNavigationEvents() {
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                console.log('Prev button clicked');
                // Логика для перехода на предыдущую страницу
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                console.log('Next button clicked');
                // Логика для перехода на следующую страницу
            });
        }
    }
}




