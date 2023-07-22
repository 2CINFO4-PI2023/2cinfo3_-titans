import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { CartService } from '../../shared/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product: Product[] = [];
  wishlistItems: Product[] = [];

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService) {
    // this.product.subscribe(products => this.wishlistItems = products);
  }

  ngOnInit() {
   this.fetchFavorites()
  }

  fetchFavorites(){
    this.wishlistService.getProducts().subscribe((data) => {
      console.log("wishlistItems data:",data)
      this.wishlistItems = data
    });
  }
  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
  }
  reload() {
    this.reloadComponent(false, '/pages/wishlist');
  }

  reloadCurrent() {
    this.reloadComponent(true);
  }
  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/home', { skipLocationChange: false }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

  reloadPage() {
    window.location.reload()
  }
  // Remove from wishlist
  public removeItem(product: Product) {
    this.wishlistService.removeFromWishlist(product).subscribe((data => {
      this.fetchFavorites()
    }));
    //this.reload();
  }

}
