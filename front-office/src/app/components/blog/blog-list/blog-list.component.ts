import { Component, OnInit } from '@angular/core';
import { EventService } from './blog-list.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
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
