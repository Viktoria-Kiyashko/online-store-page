import { BehaviorSubject } from "rxjs";
import { Product } from "../interfaces/Product";

// Добавим тип State для использования в коде
export interface State {
    products: Product[];
    cart: ShoppingCart; // Используем переименованный интерфейс
}

// Исправляем интерфейс локальной корзины
export interface ShoppingCart {
    products: {
        [key: string]: {
            product: Product;
            amount: number;
        };
    };
}

// Определение начального состояния
const DEFAULT_STATE: State = {
    cart: {
        products: {},
    },
    products: [], // Добавлено присваивание для products
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

        // Обновляем корзину, не теряя существующие продукты
        const newCart = {
            ...currentCart,
            [product.id]: {
                product,
                amount: (currentCart[product.id]?.amount || 0) + 1, // Увеличиваем количество
            }
        };

        console.log("Обновленная корзина:", newCart);

        // Обновляем состояние с новой корзиной
        this.update({
            cart: { products: newCart },
        });
    }

    // Обновление состояния
    update(state: Partial<State> = {}) {
        this.$state.next({
            ...this.state,
            ...state,
        });
    }
}

export const appStore = new AppStore();

