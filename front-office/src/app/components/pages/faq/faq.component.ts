import { Component } from '@angular/core';
import { ReclamationService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent {
  claimCreated: boolean = false;
  claimDescription: string = '';
  reclamationType: string = '';
  id: string = ''; // Add the 'id' property and set its appropriate value

  constructor(private reclamationService: ReclamationService) {}

  generateRandomNumber(): string {
    const prefix = 'RC-';
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNumber}`;
  }

  ngOnInit() {
    this.reclamationService.getNewStatusId().subscribe(
      (response) => {
        this.id = response._id;
      },
      (error) => {
        console.error('Failed to get new statut!', error);
      }
    );
  }

  submitClaim(claimDescription: string, reclamationType: string) {
    const reclamation = {
      description: claimDescription,
      type: reclamationType,
      statut: this.id,
      numero: this.generateRandomNumber()
    };

    this.reclamationService.createReclamation(reclamation).subscribe(
      (response) => {
        console.log('Claim submitted successfully.', response);
        this.claimCreated = true;
        this.claimDescription = '';
        this.reclamationType = '';
        alert('Claim created!');
      },
      (error) => {
        console.error('Failed to submit claim.', error);
      }
    );
  }
}
