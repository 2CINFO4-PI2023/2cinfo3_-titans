import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { HttpClient,HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];

  amount: number;
  payments: string[] = ['Payment with bank card?', 'Stripe'];
  paymantWay: string[] = ['Payment on delivery', 'Payment with bank card (Stripe)'];

  constructor(private cartService: CartService, public productService: ProductService, private _httpClient: HttpClient) { }
  

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getTotal().subscribe(amount => this.amount = amount);
  }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }
  
    public onSubmit(): void {
      const data = {
        taxPrice: 6,
        shippingPrice: 4,
        user: "64ac924c05f850ac9e29a813",
        orderItems: [
          {
            qty: 2,
            plat: "64ac92a505f850ac9e29a818"
          }
        ],
        shippingInfo: {
          address: "test adress",
          city: "ariana",
          phoneNumber: 36586160,
          postalCode: 1046,
          country: "tunisia"
        },
        paymentInfo: {
          id: "pi_1Hdsfdd5f98fzffz9f8f8f9zzf8",
          status: "succeeded"
        }
      }
       this._httpClient.post(`http://localhost:9090/commandes`,data);
      }

}
