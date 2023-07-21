import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { EventService } from 'app/core/event/event.service';
import { EventTypeService } from 'app/core/eventType/eventType.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './eventDetail.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EventDetailComponent implements OnInit {
  eventTypes: any;
  @ViewChild('eventDetailNgForm') eventDetailNgForm: NgForm;

  roles = {
    1: 'Client',
    99: 'Admin',
  };

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  eventDetailsForm: FormGroup;
  isUpdating: boolean = false;

  constructor(
    private eventService: EventService,
    private eventTypeService: EventTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventDetailsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      event_capacity: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      availablePlaces: new FormControl(0, Validators.required), // Add availablePlaces field
    });

    this.eventTypeService.getEventTypes().subscribe((types: any) => {
      this.eventTypes = types;
    });

    this.route.params.subscribe((params) => {
      const eventId = params['id'];

      if (eventId) {
        this.isUpdating = true;
        this.eventService.getEvent(eventId).subscribe((event: any) => {
          this.eventDetailsForm.patchValue({
            name: event.name,
            date: event.date,
            description: event.description,
            address: event.address,
            event_capacity: event.event_capacity,
            eventType: event.eventType._id,
            availablePlaces: event.availablePlaces, // Set the form control value for availablePlaces
          });
        });
      }
    });
  }

  goToEventsList() {
    this.router.navigateByUrl('/events');
  }

  onAvatarChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.eventDetailsForm.patchValue({
        image: file,
      });
    }
  }

  onSubmit(): void {
    this.showAlert = false;
    this.eventDetailsForm.disable();

    const formData = new FormData();
    formData.append('name', this.eventDetailsForm.get('name').value);
    formData.append('date', this.eventDetailsForm.get('date').value);
    formData.append('description', this.eventDetailsForm.get('description').value);
    formData.append('address', this.eventDetailsForm.get('address').value);
    formData.append('event_capacity', this.eventDetailsForm.get('event_capacity').value);
    formData.append('eventType', this.eventDetailsForm.get('eventType').value);
    formData.append('availablePlaces', this.eventDetailsForm.get('availablePlaces').value); // Append availablePlaces value
    formData.append('image', this.eventDetailsForm.get('image').value);

    if (this.isUpdating) {
      const eventId = this.route.snapshot.params['id'];
      this.eventService.updateEvent(eventId, formData).subscribe(
        (res: any) => {
          this.goToEventsList();
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
          this.eventDetailsForm.enable();
          this.showAlert = true;
        }
      );
    } else {
      // Perform add operation
      this.eventService.addEvent(formData).subscribe(
        () => {
          this.goToEventsList();
        },
        (error) => {
          this.alert = {
            type: 'error',
            message: 'An error occurred, please try again later',
          };
          this.eventDetailsForm.enable();
          this.showAlert = true;
        }
      );
    }
  }
}
