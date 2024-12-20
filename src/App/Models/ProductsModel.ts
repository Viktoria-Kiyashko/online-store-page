//ProductsModel.ts
import { getProducts } from "../DB/Product.DB";
import { Product } from "../interfaces/Product";
import { appStore } from "../Store/AppStore";

export class ProductsModel {
    static isExist = false;
    static instance: ProductsModel;

    constructor() {
        if (ProductsModel.isExist) {
            return ProductsModel.instance;
        }
        ProductsModel.isExist = true;
        ProductsModel.instance = this;
    }

    
    static getProducts(): Promise<Product[]> {
        return getProducts() 
            .then((products: Product[]) => {
                appStore.update({
                    products, 
                });
                return products;
            });
    }
}

export const productsModels = new ProductsModel();
