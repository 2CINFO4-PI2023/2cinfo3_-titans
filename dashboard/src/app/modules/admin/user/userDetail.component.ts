import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './userDetail.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserDetailComponent implements OnInit {
    @ViewChild('userDetailNgForm') userDetailNgForm: NgForm;

    roles = {
        1: 'Client',
        99: 'Admin',
    };

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    userDetailsForm: FormGroup;
    isUpdating: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userDetailsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            phone: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\d{8}$/),
            ]),
            address: new FormControl('', Validators.required),
            role: new FormControl(this.roles[1], Validators.required),
            // image: new FormControl(null),
        });

        this.route.params.subscribe((params) => {
            const userId = params['id'];

            if (userId) {
                this.isUpdating = true;
                this.userDetailsForm = new FormGroup({
                    name: new FormControl('', Validators.required),
                    email: new FormControl('', [
                        Validators.required,
                        Validators.minLength(8),
                    ]),
                    phone: new FormControl('', [
                        Validators.required,
                        Validators.pattern(/^\d{8}$/),
                    ]),
                    address: new FormControl('', Validators.required),
                    role: new FormControl('', Validators.required),
                    // image: new FormControl(null),
                });
                this.userService.getUser(userId).subscribe((user: any) => {
                    this.userDetailsForm.patchValue({
                        name: user.name,
                        email: user.email,
                        password: '',
                        phone: user.phone,
                        address: user.address,
                        role: user.role,
                    });
                });
            }
        });
    }

    goToUsersList() {
        this.router.navigateByUrl('/utilisateurs');
    }

    onSubmit(): void {
        this.showAlert = false;
        this.userDetailsForm.disable();

        if (this.isUpdating) {
            const userId = this.route.snapshot.params['id'];
            this.userService
                .updateUser(userId, this.userDetailsForm.value)
                .subscribe(
                    () => {
                        this.goToUsersList();
                    },
                    (error) => {
                        if (error.status === 409) {
                            this.alert = {
                                type: 'error',
                                message:
                                    'Cette adresse e-mail est déjà utilisée',
                            };
                        } else if (error.status === 400) {
                            console.log(error);
                            this.alert = {
                                type: 'error',
                                message: 'error occured',
                            };
                        } else {
                            this.alert = {
                                type: 'error',
                                message:
                                    'Une erreur est survenue veuillez réessayer ultérieurement',
                            };
                        }
                        this.userDetailsForm.enable();
                        this.showAlert = true;
                    }
                );
        } else {
            // Perform add operation
            this.userService.addUser(this.userDetailsForm.value).subscribe(
                () => {
                    this.goToUsersList();
                },
                (error) => {
                    if (error.status === 409) {
                        this.alert = {
                            type: 'error',
                            message: 'Cette adresse e-mail est déjà utilisée ',
                        };
                    } else if (error.status === 400) {
                        console.log(error);
                        this.alert = {
                            type: 'error',
                            message: 'error occured',
                        };
                    } else {
                        this.alert = {
                            type: 'error',
                            message:
                                'Une erreur est survenue veuillez réessayer ultérieurement',
                        };
                    }
                    this.userDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        }
    }
}
