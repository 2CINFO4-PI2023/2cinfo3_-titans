import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventService } from 'app/core/event/event.service';
import { InscriptionService } from 'app/core/inscription/inscription.service';

import { Inscription } from 'app/core/inscription/inscription.types';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscriptionDetail.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class InscriptionDetailComponent implements OnInit {
  @ViewChild('inscriptionDetailNgForm') inscriptionDetailNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  events:any;
  users :any;
  showAlert: boolean = false;
  inscriptionDetailsForm: FormGroup;
  isUpdating: boolean = false;
  

  constructor(
    private inscriptionService: InscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users=>{
      this.users=users.users
    })
    this.eventService.getEvents().subscribe(event=>{this.events=event})
    this.inscriptionDetailsForm = new FormGroup({
      eventId: new FormControl('', Validators.required), // Change the type here to accept text values
      userId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      const inscriptionId = params['id'];

      if (inscriptionId) {
        this.isUpdating = true;
        this.inscriptionService.getInscription(inscriptionId).subscribe((inscription: any) => {
          this.inscriptionDetailsForm.patchValue({
            userId: inscription.userId,
            name: inscription.name,
            email: inscription.email,
            eventId: inscription.eventId,
            status: inscription.status,
          });
        });
      }
    });
  }

  goToInscriptionsList() {
    this.router.navigateByUrl('/inscription');
  }

  onSubmit(): void {
    this.showAlert = false;
    this.inscriptionDetailsForm.disable();

    const formData = new FormData();
    formData.append('userId', this.inscriptionDetailsForm.get('userId').value);
    formData.append('name', this.inscriptionDetailsForm.get('name').value);
    formData.append('email', this.inscriptionDetailsForm.get('email').value);
    formData.append('eventId', this.inscriptionDetailsForm.get('eventId').value);
    formData.append('status', this.inscriptionDetailsForm.get('status').value);

    if (this.isUpdating) {
      const inscriptionId = this.route.snapshot.params['id'];

      this.inscriptionService.updateInscription(inscriptionId, formData).subscribe(
        (res: any) => {
          this.goToInscriptionsList();
        },
        (error) => {
          if (error.status === 409) {
            this.alert = {
              type: 'error',
              message: 'Email or phone number is already used',
            };
          } else if (error.status === 400) {
            console.log(error);
            this.alert = {
              type: 'error',
              message: 'An error occurred',
            };
          } else {
            this.alert = {
              type: 'error',
              message: 'no available places',
            };
          }
          this.inscriptionDetailsForm.enable();
          this.showAlert = true;
        }
      );
    } else {
      // Perform add operation

      const data = {

        userId: this.inscriptionDetailsForm.get('userId').value,
        name: this.inscriptionDetailsForm.get('name').value,
        email: this.inscriptionDetailsForm.get('email').value,
        eventId: this.inscriptionDetailsForm.get('eventId').value,
        status: this.inscriptionDetailsForm.get('status').value
      }
      this.inscriptionService.addInscription(data).subscribe(
        () => {
          this.goToInscriptionsList();
        },
        (error) => {
          this.alert = {
            type: 'error',
            message: 'User already registred for the event',
          };
          this.inscriptionDetailsForm.enable();
          this.showAlert = true;
        }
      );
    }
  }
}
