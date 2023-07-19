import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventTypeService } from 'app/core/eventType/eventType.service';

@Component({
  selector: 'app-eventType-detail',
  templateUrl: './eventTypeDetail.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EventTypeDetailComponent implements OnInit {
  eventTypeTypes:any
  @ViewChild('eventTypeDetailNgForm') eventTypeDetailNgForm: NgForm;

  roles = {
    1: 'Client',
    99: 'Admin',
  };

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  eventTypeDetailsForm: FormGroup;
  isUpdating: boolean = false;

  constructor(
    private eventTypeService: EventTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventTypeDetailsForm = new FormGroup({
      name: new FormControl('', Validators.required),
     
      description: new FormControl('', Validators.required),
      
      
    });

    this.route.params.subscribe((params) => {
      const eventTypeId = params['id'];

      if (eventTypeId) {
        this.isUpdating = true;
        this.eventTypeService.getEventType(eventTypeId).subscribe((eventType: any) => {
          this.eventTypeDetailsForm.patchValue({
            name: eventType.name,
           
            description: eventType.description,
            

          });
        });
      }
    });
  }

  goToEventTypesList() {
    this.router.navigateByUrl('/eventTypes');
  }
  

  onSubmit(): void {
    this.showAlert = false;
    this.eventTypeDetailsForm.disable();

    const formData = new FormData();
    formData.append('name', this.eventTypeDetailsForm.get('name').value);
   
    formData.append('description', this.eventTypeDetailsForm.get('description').value);
    
    if (this.isUpdating) {
      const eventTypeId = this.route.snapshot.params['id'];
      this.eventTypeService.updateEventType(eventTypeId, formData).subscribe(
        (res: any) => {
          
          this.goToEventTypesList();
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
          this.eventTypeDetailsForm.enable();
          this.showAlert = true;
        }
      );
    } else {
      // Perform add operation
      this.eventTypeService.addEventType(formData).subscribe(
        () => {
          this.goToEventTypesList();
        },
        (error) => {
            this.alert = {
                type: 'error',
                message: 'An error occurred, please try again later',
              };
          this.eventTypeDetailsForm.enable();
          this.showAlert = true;
        }
      );
    }
  }
}
