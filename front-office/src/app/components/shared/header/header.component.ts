import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "src/app/modals/product.model";
import { CartItem } from "src/app/modals/cart-item";
import { CartService } from "../services/cart.service";
import { SidebarMenuService } from "../sidebar/sidebar-menu.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  public sidenavMenuItems: Array<any>;

  public currencies = ["USD", "EUR"];
  public currency: any;
  public flags = [
    { name: "English", image: "assets/images/flags/gb.svg" },
    { name: "German", image: "assets/images/flags/de.svg" },
    { name: "French", image: "assets/images/flags/fr.svg" },
    { name: "Russian", image: "assets/images/flags/ru.svg" },
    { name: "Turkish", image: "assets/images/flags/tr.svg" },
  ];
  public flag: any;

  public shoppingCartItems: CartItem[] = [];
  isAutheticated: boolean;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartService.getItems().subscribe((shoppingCartItems) => {
      this.shoppingCartItems = shoppingCartItems;
    });
  }

  ngOnInit() {
    this.authService.authenticated$.subscribe((authenticated) => {
      this.isAutheticated = authenticated;
    });
  }
}
