import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { IngredientService } from "app/core/ingredient/ingredient.service";

@Component({
    selector: 'app-ingredient-detail',
    templateUrl: './ingredientDetail.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class IngredientDetailComponent implements OnInit {
    @ViewChild('ingredientDetailsNgForm') ingredientDetailsNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    ingredientDetailsForm: FormGroup;
    isUpdating: boolean = false;

    constructor(
        private ingredientService: IngredientService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.ingredientDetailsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            quantity: new FormControl('', [
                Validators.required,
                Validators.min(1)
            ]),
            image: new FormControl('', Validators.required),
        });

        this.route.params.subscribe((params) => {
            const ingredientId = params['id'];

            if (ingredientId) {
                this.isUpdating = true;
                this.ingredientDetailsForm = new FormGroup({
                    name: new FormControl('', Validators.required),
                    quantity: new FormControl('', [
                        Validators.required,
                        Validators.min(1)
                    ]),
                    image: new FormControl('', Validators.required),
                });
                this.ingredientService.getIngredient(ingredientId).subscribe((ingredient: any) => {
                    this.ingredientDetailsForm.patchValue({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                        image: ingredient.image
                    });
                });
            }
        });
    }

    onAvatarChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement?.files && inputElement.files.length > 0) {
            const file = inputElement.files[0];
            this.ingredientDetailsForm.patchValue({
                image: file,
            });
        }
    }

    goToIngredientsList() {
        this.router.navigateByUrl('/ingredient');
    }
    upload(event: Event) {
        console.log(event);
    }
    onSubmit(): void {
        this.showAlert = false;
        this.ingredientDetailsForm.disable();
        const formData = new FormData();
        formData.append('name', this.ingredientDetailsForm.get('name').value);
        formData.append('quantity', this.ingredientDetailsForm.get('quantity').value);
        formData.append('image', this.ingredientDetailsForm.get('image').value);
        if (this.isUpdating) {
            const ingredientId = this.route.snapshot.params['id'];
            console.log(formData)
            this.ingredientService
                .updateIngredient(ingredientId, formData)
                .subscribe(
                    () => {
                        this.goToIngredientsList();
                    },
                    (error) => {
                        if (error.status === 400) {
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
                        this.ingredientDetailsForm.enable();
                        this.showAlert = true;
                    }
                );
        } else {
            // Perform add operation
            this.ingredientService.createIngredient(formData).subscribe(
                () => {
                    this.goToIngredientsList();
                },
                (error) => {
                    if (error.status === 400) {
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
                    this.ingredientDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        }
    }
}