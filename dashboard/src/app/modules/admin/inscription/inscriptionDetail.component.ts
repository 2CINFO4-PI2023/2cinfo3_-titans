import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { InscriptionService } from 'app/core/inscription/inscription.service';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscriptionDetail.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class InscriptionDetailComponent implements OnInit {
  @ViewChild('inscriptionDetailNgForm') inscriptionDetailNgForm: NgForm;

  roles = {
    1: 'Client',
    99: 'Admin',
  };

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  inscriptionDetailsForm: FormGroup;
  isUpdating: boolean = false;

  constructor(
    private inscriptionService: InscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inscriptionDetailsForm = new FormGroup({
      eventId: new FormControl('', Validators.required),
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
            eventId: inscription.eventId,
            name: inscription.name,
           
          });
        });
      }
    });
  }

  goToInscriptionsList() {
    this.router.navigateByUrl('/inscriptions');
  }

  onAvatarChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.inscriptionDetailsForm.patchValue({
        image: file,
      });
    }
  }

  onSubmit(): void {
    this.showAlert = false;
    this.inscriptionDetailsForm.disable();

    const formData = new FormData();
    formData.append('eventId', this.inscriptionDetailsForm.get('eventId').value);
    formData.append('userId', this.inscriptionDetailsForm.get('userId').value);
    formData.append('name', this.inscriptionDetailsForm.get('name').value);
    formData.append('email', this.inscriptionDetailsForm.get('email').value);
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
              message: 'An error occurred, please try again later',
            };
          }
          this.inscriptionDetailsForm.enable();
          this.showAlert = true;
        }
      );
    } else {
      // Perform add operation
      this.inscriptionService.addInscription(formData).subscribe(
        () => {
          this.goToInscriptionsList();
        },
        (error) => {
          this.alert = {
            type: 'error',
            message: 'An error occurred, please try again later',
          };
          this.inscriptionDetailsForm.enable();
          this.showAlert = true;
        }
      );
    }
  }
}
