import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandeService } from '../../shared/services/commande.service';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];

  stripe: boolean = false;

  amount: number;
  payments: string[] = ['Payment with bank card?', 'Stripe'];
  paymantWay: string[] = ['Payment on delivery', 'Payment with bank card (Stripe)'];
  commandeErrMsg: string;
  commandeInfoMsg: string;
  commandeForm: FormGroup;

  constructor(private router: Router,private cartService: CartService, public productService: ProductService, private commandeService: CommandeService,private _httpClient: HttpClient) { }
  orderItems: any = [];

  commandeData: {
    address: String;
    city: String;
    phoneNumber: String;
    postalCode: any;
    country: any;
    taxPrice: any;
    shippingPrice: any;


  } = {
    address: "",
    city: "",
    phoneNumber: "",
    postalCode: "",
    country: "",
    taxPrice: 70,
    shippingPrice: 0,

  };
  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getTotal().subscribe(amount => this.amount = amount);
    this.commandeForm = new FormGroup({
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/
        ),
      ]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      postalCode: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),





    });
  }

  radioChange(event: MatRadioChange, data) {
    let obj = {selected: ""};
    obj.selected = event.value;
    if(obj.selected==="Payment on delivery") {
      this.commandeData.shippingPrice=10;
      this.stripe=false;

    }
    if(obj.selected==="Payment with bank card (Stripe)") {
      this.commandeData.shippingPrice=0;
      this.stripe=true;
    }
    console.log("obj",obj,event);
  }


   public getTotal(): Observable<number> {
    let total : Observable<number>;
    total = this.cartService.getTotalAmount();
    if(total){
      return total;
    }
    }



    public getTotalCommande(): Observable<number> {
      let total : Observable<number>;

      total =  this.cartService.getTotalAmount()+this.commandeData.shippingPrice+this.commandeData.taxPrice;
      if(total){
        return total;
      }
      }
  
    public placeOrder() {
      const userInfo = window.localStorage.getItem("userInfo");
      console.log('buyProducts',this.buyProducts);
      this.buyProducts.forEach((item)=>{

        item.qty = item.quantity;
        item.plat=item.product._id;

 
      })
      const json: any = {
        shippingInfo: this.commandeForm.value,
        orderItems: this.buyProducts,
        user: JSON.parse(userInfo)._id,
        taxPrice: this.commandeData.taxPrice,
        shippingPrice: this.commandeData.shippingPrice,
      }
      this.commandeForm.disable();
      this.commandeService.addCommande(json).subscribe(
        
        (res) => {


          this.commandeErrMsg = "";
          this.commandeInfoMsg =
            "You will receive a confirmation email of your order";
          this.commandeForm.enable();
          this.router.navigate(['pages/success']);

        },
        (error: any) => {
          console.log("call service");

          this.commandeInfoMsg = "";
          this.commandeForm.enable();
          if (error.status == 409) {
            this.commandeErrMsg = "commande  is already used";
          } else if (error.status == 401) {
            this.commandeErrMsg =
              "Your account is not active please check your email";
          } else {
            this.commandeErrMsg =
              "A technical error has occurred. Please try again in a few minutes";
          }
        }
      );

      if(this.stripe) {
        const stripeJson = {
          amount: this.amount+this.commandeData.shippingPrice+this.commandeData.taxPrice
        }
        this.commandeService.payCommande(stripeJson).subscribe(
        
          (res:any) => {
            console.log("res",res);
            window.open(res.info.url,"_self")
  
            this.commandeErrMsg = "";
            this.commandeInfoMsg =
              "You will receive a confirmation email of your order";
            this.commandeForm.enable();
          },
          (error: any) => {
            console.log("call service");
  
            this.commandeInfoMsg = "";
            this.commandeForm.enable();
            if (error.status == 409) {
              this.commandeErrMsg = "commande  is already used";
            } else if (error.status == 401) {
              this.commandeErrMsg =
                "Your account is not active please check your email";
            } else {
              this.commandeErrMsg =
                "A technical error has occurred. Please try again in a few minutes";
            }
          }
        );
      }

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
      }

}
