import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from './blog-details.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
user:any

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('eventid');
    this.inscriptionService.getEvent(eventId)
      .subscribe((response: any) => {
        this.event = response;
      });
      this.authService.getAuthentified().subscribe((user)=>{
        this.user = user
      })
  }

  submitRegistrationForm() {
    const inscription = {
      eventId: this.route.snapshot.paramMap.get('eventid'),
      userId: this.user._id,
      email:this.user.email,
      name:this.user.name,
      status: 'confirmed',
    };

    this.inscriptionService.createInscription(inscription)
      .subscribe(
        (response: any) => {
          console.log('Inscription created:', response);
          this.name = '';
          this.email = '';
          this.content = '';
          this.showNotification('Your registration is submitted with success!') ;
        },
        (error: any) => {
          console.error('Error creating inscription:', error);
          this.showNotification('You are already registred for '+this.event.name +'!') ;
        }
      );
  }

  scrollToEventDetails() {
    const element = document.getElementById('eventDetails');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds (3 seconds in this example)
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
