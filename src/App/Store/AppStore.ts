import { BehaviorSubject } from "rxjs";
import { Product } from "../interfaces/Product";


export interface State {
    products: Product[];
    cart: ShoppingCart; 
}


export interface ShoppingCart {
    products: {
        [key: string]: {
            product: Product;
            amount: number;
        };
    };
}


const DEFAULT_STATE: State = {
    cart: {
        products: {},
    },
    products: [], 
};

export class AppStore {
    static isExist = false;
    static instance: AppStore;

    private state = DEFAULT_STATE;
    public $state = new BehaviorSubject<State>(this.state);

    constructor() {
        if (AppStore.isExist) {
            return AppStore.instance;
        }
        AppStore.isExist = true;
        AppStore.instance = this;

        this.$state.subscribe((state: State) => {
            this.state = state;
        });
    }

    // Метод для добавления продукта в корзину
    addProduct(product: Product): void {
        console.log("Добавляем продукт в корзину:", product);
        const currentCart = this.state.cart.products;

       
        const newCart = {
            ...currentCart,
            [product.id]: {
                product,
                amount: (currentCart[product.id]?.amount || 0) + 1, 
            }
        };

        console.log("Обновленная корзина:", newCart);

       
        this.update({
            cart: { products: newCart },
        });
    }

   
    update(state: Partial<State> = {}) {
        this.$state.next({
            ...this.state,
            ...state,
        });
    }
}

export const appStore = new AppStore();

