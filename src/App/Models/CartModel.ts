//CartModel.ts
import { Product } from '../interfaces/Product';
import { getProducts } from '../DB/Product.DB';
import { appStore } from '../Store/AppStore';

export class CartModel {
  static isExist = false;
  static instance: CartModel;

  constructor() {
    if (CartModel.isExist) {
      return CartModel.instance;
    }

    CartModel.isExist = true;
    CartModel.instance = this;
  }

  static addProduct(product: Product): void {
    appStore.update({
      cart: {
        products: {
          [product.id]: {
            amount: 1,
            product,
          },
        },
      },
    });
  }
}

export const cartModel = new CartModel();