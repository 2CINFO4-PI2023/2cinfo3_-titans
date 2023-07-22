import { Component, OnInit } from '@angular/core';
import { EventService } from './blog-column.service';

@Component({
  selector: 'app-blog-column',
  templateUrl: './blog-column.component.html',
  styleUrls: ['./blog-column.component.sass']
})
export class BlogColumnComponent implements OnInit {
  events: any[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
      (response) => {
        this.events = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
