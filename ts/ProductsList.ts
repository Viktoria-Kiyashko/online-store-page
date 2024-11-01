import { Product } from "../../interfaces/Product";
import { productsModels } from "../../Models/ProductsModel";
import { ProductItem } from "../ProductItem";

export class ProductsList{
    private loading = false;
    private error: Error| null = null;
    private products: Product [] =[];
 constructor () {
this.fetchProducts();
 }
 fetchProducts() {
    this.loading=true;
    productsModels.getProducts()
    .then ((products: Product[])=> {
        this.products = products;
    })Promise<void>;
    .catch((error)=> {
        this.error=error;
    }) 
 };
    
    render() {
        return `
            <h2>Products List</h2>
            ${this.products.map((product: Product)=> new ProductItem(product)).map((product: ProductItem) => product.render()).join('')}
            ${this.loading ? '<p>Loading...</p>' : ''}
            <p>-----</p>
            <div>
            <button>prev</button>
            <button>next</button>
            </div>
        `;
    }
}