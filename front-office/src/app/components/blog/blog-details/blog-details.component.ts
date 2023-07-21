import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from './blog-details.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.sass']
})
export class BlogDetailsComponent implements OnInit {
  event: any;
  name: string;
  lastName: string;
  email: string;
  content: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService
  ) { }

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventid');
    this.inscriptionService.getEvent(eventId)
      .subscribe((response: any) => {
        this.event = response;
      });
  }

  submitRegistrationForm() {
    const inscription = {
      eventId: this.route.snapshot.paramMap.get('eventid'),
      userId: '649f43dccd5a374f418af849',
      name: this.name,
      email: this.email,
      status: 'confirmed',
     
    };

    this.inscriptionService.createInscription(inscription)
      .subscribe(
        (response: any) => {
          console.log('Inscription created:', response);
          this.name = '';
          this.email = '';
          this.content = '';
        },
        (error: any) => {
          console.error('Error creating inscription:', error);
        }
      );
  }

  scrollToEventDetails() {
    const element = document.getElementById('eventDetails');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
