import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { PlatService } from "app/core/plat/plat.service";

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

    constructor(
        private platService: PlatService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.platDetailsForm = new FormGroup({
            name: new FormControl('', Validators.required),
            price: new FormControl('', [
                Validators.required,
                Validators.min(1)
            ]),
            ingredients: new FormControl(''),
            image: new FormControl('', Validators.required),
        });

        this.route.params.subscribe((params) => {
            const platId = params['id'];

            if (platId) {
                this.isUpdating = true;
                this.platDetailsForm = new FormGroup({
                    name: new FormControl('', Validators.required),
                    price: new FormControl('', [
                        Validators.required,
                        Validators.min(1)
                    ]),
                    image: new FormControl('', Validators.required),
                });
                this.platService.getPlat(platId).subscribe((plat: any) => {
                    Object.keys(plat.ingredients).forEach((i)=>{
                        this.inputFields.push({key:i,value:plat.ingredients[i]})
                    });          
                    this.platDetailsForm.patchValue({
                        name: plat.name,
                        price: plat.price,
                        ingredients: this.inputFields,
                        image: plat.image
                    });
                });
            }
        });
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
        const obj = {}
        this.inputFields.forEach(element => {
            obj[element.key] = element.value
        });
        const jsonIngredients = JSON.stringify(obj);
        const blobIngredients = new Blob([jsonIngredients], { type: 'application/json' });
        const formData = new FormData();
        formData.append('name',this.platDetailsForm.get('name').value);
        formData.append('price',this.platDetailsForm.get('price').value);
        formData.append('image', this.platDetailsForm.get('image').value);
        formData.append('ingredients', blobIngredients);

        if (this.isUpdating) {
            const platId = this.route.snapshot.params['id'];
            this.platService
                .updatePlat(platId, formData)
                .subscribe(
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