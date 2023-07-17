import { Component, OnInit } from '@angular/core';
import { InscriptionService } from './blog-details.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.sass']
})
export class BlogDetailsComponent implements OnInit {
  event: any;
  firstName: string;
  lastName: string;
  email: string;
  content: string;

  constructor(private inscriptionService: InscriptionService) { }

  ngOnInit() {
    // Fetch event details from the server using the event ID
    const eventId = '6496268d43e194ba488d566c'; // Replace with actual event ID
    this.inscriptionService.getEvent(eventId)
      .subscribe((response: any) => {
        this.event = response;
      });
  }

  submitRegistrationForm() {
    const inscription = {
      eventId: '6496268d43e194ba488d566c', // Replace with actual event ID
      userId: '649f43dccd5a374f418af849', // Replace with actual user ID
      name: this.firstName + ' ' + this.lastName,
      email: this.email,
      status: 'confirmed',
      content: this.content
    };

    this.inscriptionService.createInscription(inscription)
      .subscribe(
        (response: any) => {
          // Inscription created successfully
          console.log('Inscription created:', response);
          // Reset form values
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.content = '';
        },
        (error: any) => {
          // Error occurred while creating inscription
          console.error('Error creating inscription:', error);
        }
      );
  }
}
