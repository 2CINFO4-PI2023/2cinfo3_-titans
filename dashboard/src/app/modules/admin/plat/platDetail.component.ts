import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { IngredientService } from 'app/core/ingredient/ingredient.service';
import { PlatService } from 'app/core/plat/plat.service';

@Component({
    selector: 'app-plat-detail',
    templateUrl: './platDetail.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class PlatDetailComponent implements OnInit {
    @ViewChild('platDetailsNgForm') platDetailsNgForm: NgForm;

    inputFields = [];

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    platDetailsForm: FormGroup;
    isUpdating: boolean = false;
    ingredients: any;
    ingredientsArray: FormArray;

    constructor(
        private platService: PlatService,
        private router: Router,
        private route: ActivatedRoute,
        private ingredientService: IngredientService,
        private formBuilder: FormBuilder
    ) {
        this.platDetailsForm = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(1)]],
            ingredients: this.formBuilder.array([]), // Initialize an empty FormArray
            image: ['', Validators.required],
            description: ['', Validators.required],
          });
          this.ingredientsArray = this.platDetailsForm.get('ingredients') as FormArray;
    }

    ngOnInit(): void {
        this.ingredientService.getIngredients().subscribe(
            (data) => {
                this.ingredients = data
            },
            (err) => {
                console.log('err:', err);
            }
        );
        this.platDetailsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl('', [
                Validators.required,
                Validators.min(1),
            ]),
            ingredients: this.formBuilder.array([]),
            image: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });

        this.route.params.subscribe((params) => {
            const platId = params['id'];

            if (platId) {
                this.isUpdating = true;
                this.platDetailsForm = new FormGroup({
                    name: new FormControl('', Validators.required),
                    price: new FormControl('', [
                        Validators.required,
                        Validators.min(1),
                    ]),
                    image: new FormControl('', Validators.required),
                    description: new FormControl('', Validators.required),
                });
                this.platService.getPlat(platId).subscribe((plat: any) => {
                    Object.keys(plat.ingredients).forEach((i) => {
                        this.inputFields.push({
                            key: i+'',
                            value: plat.ingredients[i],
                        });
                    });
                    this.platDetailsForm.patchValue({
                        name: plat.name,
                        price: plat.price,
                        ingredients: this.inputFields,
                        image: plat.image,
                    });
                });
            }
        });
    }

    addIngredientToForm(ingredient: any) {
        this.ingredientsArray.push(
          this.formBuilder.group({
            key: [ingredient._id],
            value: ['', [Validators.required, Validators.min(1)]],
          })
        );
      }

      removeIngredient(index: number) {
        this.ingredientsArray.removeAt(index);
      }
    onAvatarChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement?.files && inputElement.files.length > 0) {
            const file = inputElement.files[0];
            this.platDetailsForm.patchValue({
                image: file,
            });
        }
    }

    goToPlatsList() {
        this.router.navigateByUrl('/plat');
    }
    upload(event: Event) {
        console.log(event);
    }
    addInput() {
        this.inputFields.push({ key: '', value: '' });
    }
    

    remove(item) {
        this.inputFields.splice(this.inputFields.indexOf(item), 1);
    }
    onSubmit(): void {
        this.showAlert = false;
        this.platDetailsForm.disable();
        const obj = {};
        console.log("this.inputFields: ",this.inputFields)
        this.inputFields.forEach((element) => {
            if (obj[element.key]) {
                const existingValue = obj[element.key];
                const new_value = existingValue + element.value
                obj[element.key]=  new_value;
            } else {
                obj[element.key] = element.value;
            }
        });
        const jsonIngredients = JSON.stringify(obj);
        const formData = new FormData();
        formData.append('name', this.platDetailsForm.get('name').value);
        formData.append('price', this.platDetailsForm.get('price').value);
        formData.append('image', this.platDetailsForm.get('image').value);
        formData.append('description', this.platDetailsForm.get('description').value);
        formData.append('ingredients', jsonIngredients);

        if (this.isUpdating) {
            const platId = this.route.snapshot.params['id'];
            this.platService.updatePlat(platId, formData).subscribe(
                () => {
                    this.goToPlatsList();
                },
                (error) => {
                    if (error.status === 400) {
                        console.log(error);
                        this.alert = {
                            type: 'error',
                            message: 'error occurred',
                        };
                    } else {
                        this.alert = {
                            type: 'error',
                            message:
                                'Une erreur est survenue veuillez réessayer ultérieurement',
                        };
                    }
                    this.platDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        } else {
            // Perform add operation
            this.platService.createPlat(formData).subscribe(
                () => {
                    this.goToPlatsList();
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
                    this.platDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        }
    }
}
