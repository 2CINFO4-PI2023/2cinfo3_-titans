import { Product } from './product.model';

// cart items
export interface CartItem {
  product: Product;
  quantity: number;
  qty: any;
  plat: any;
}
