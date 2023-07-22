import { Component, OnInit } from '@angular/core';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductZoomComponent } from '../../products/product-details/product-zoom/product-zoom.component';
import { GaleryZoomComponent } from './galery-zoom/galery-zoom.component';


@Component({
  selector: 'app-popular-recipes',
  templateUrl: './popular-recipes.component.html',
  styleUrls: ['./popular-recipes.component.sass']
})
export class PopularRecipesComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  // Blog
  public blog = [{
    image: 'assets/images/galery/gal-1.jpeg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-2.jpeg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-3.jpeg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/galery/gal-5.jpeg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-6.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-7.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-8.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}, {
  image: 'assets/images/galery/gal-9.jpeg',
  date: '28 January 2018',
  title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
  by: 'John Dio'
}]


public openProductDialog(product, bigProductImageIndex) {
  let dialogRef = this.dialog.open(GaleryZoomComponent,
    {
    data: {product, index: bigProductImageIndex},

    panelClass: 'product-dialog',
  });
  dialogRef.afterClosed().subscribe(product => {
    if (product) {
      this.router.navigate(['/products', product.id, product.name]);
    }
  });
}

}
