import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  id: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private reclamationService: ReclamationService
  ) {}

  generateRandomNumber(): string {
    const prefix = 'RC-';
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNumber}`;
  
  }

  ngOnInit() {

    this.reclamationService.getNewStatusId("new").subscribe(
      (response) => {
        this.id = response._id;
      },
      (error) => {
        console.error('Failed to get new status!', error);
      }
    );
  }

  submitClaim(form: NgForm) {
    const reclamation = {
      description: this.claimDescription,
      type: this.reclamationType,
      statut: this.id,
      numero: this.generateRandomNumber()
    };

    this.reclamationService.createReclamation(reclamation).subscribe(
      (response) => {
        this.claimCreated = true;
        form.resetForm();
        this.showNotification('Claim Created!');
      },
      (error) => {
        console.error('Failed to submit claim.', error);
        this.showNotification('Failed to Submit Claim!');
      }
    );
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds (3 seconds in this example)
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
