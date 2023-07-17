import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.sass']
})
export class BlogDetailsComponent implements AfterViewInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: 'Popup Title',
        message: 'This is a popup message.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle popup close event
    });
  }
}
