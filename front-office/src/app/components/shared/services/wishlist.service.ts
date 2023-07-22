import { Injectable } from '@angular/core';
import { Product } from '../../../modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subscriber} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

// Get product from Localstorage
let products =  [];

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // wishlist array
  public wishlistProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer   :  Subscriber<{}>;
  public userid:string;
  constructor(private httpClient: HttpClient,public snackBar: MatSnackBar, private authService: AuthService) { }

    // Get  wishlist Products 
    private products(): Observable<Product[]> {
      this.authService.getAuthentified().subscribe((user)=>{
        this.userid = user._id
      })
      return this.httpClient.get<Product[]>(`${environment.base_url}/users/favoriteplate/${this.userid}`)
    }
    public getProducts(): Observable<Product[]> {
      return this.products();
    }


   // If item is aleready added In wishlist
 public hasProduct(product: Product): boolean {
  const item = products.find(item => item.id === product._id);
  return item !== undefined;
}

   // Add to wishlist
   public addToWishlist(product: Product): Product | boolean {
    let message, status;
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product._id)[0];
      const index = products.indexOf(item);
    } else {
      this.httpClient.put(`${environment.base_url}/users/favoriteplate/${this.userid}/${product._id}`,product).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
        );
        console.log("before push",products)
        products.push(product);
        console.log("after push",products)
    }
    message = 'The product ' + product.name + ' has been added to wishlist.';
            status = 'success';
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      //localStorage.setItem("wishlistItem", JSON.stringify(products));
      return item;
  }


  // Removed Product
  public removeFromWishlist(product: Product) {
    console.log("product",product)
    if (product === undefined) { return; }
    console.log("before")
    //localStorage.setItem("wishlistItem", JSON.stringify(products));
    return this.httpClient.put(`${environment.base_url}/users/favoriteplate/${this.userid}/${product._id}`,product)
  }
}
