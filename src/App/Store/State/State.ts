//State.ts
import { Product } from "../../interfaces/Product"; 

 export interface CartProducts {
    [key: string]: {
        product: Product;
        amount: number;
    }
    
}

export interface Cart {
    products: CartProducts;
}

interface State {
    products: Product[];
cart: Cart;

}