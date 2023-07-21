import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { CommandeService } from 'app/core/commande/commande.service';

@Component({
    selector: 'app-commande-detail',
    templateUrl: './commandeDetail.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CommandeDetailComponent implements OnInit {
    @ViewChild('commandeDetailsNgForm') commandeDetailsNgForm: NgForm;

    inputFields = [];

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;
    commandeDetailsForm: FormGroup;
    isUpdating: boolean = false;
    items: any;
    orderItems: FormArray;

    constructor(
        private commandeService: CommandeService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.commandeDetailsForm = this.formBuilder.group({
            user: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.min(1)]],
            postalCode: ['', [Validators.required]],
            orderItems: this.formBuilder.array([]), // Initialize an empty FormArray
            taxPrice: [''],
            shippingPrice: [''],
            country: ['', Validators.required],
            itemsPrice: ['', Validators.required],
            totalPrice: ['', Validators.required],
            orderStatus: ['', Validators.required],






          });
          this.orderItems = this.commandeDetailsForm.get('orderItems') as FormArray;
    }


    ngOnInit(): void {
        this.commandeService.getCommandes().subscribe(
            (data) => {
                this.orderItems = data.orderItems;

            },
            (err) => {
                console.log('err:', err);
            }
        );
        this.commandeDetailsForm = new FormGroup({
            user: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            city:  new FormControl('',  Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            orderItems: this.formBuilder.array([]), // Initialize an empty FormArray
            taxPrice: new FormControl('', Validators.required),
            shippingPrice: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            totalPrice: new FormControl('', Validators.required),
            itemsPrice: new FormControl('', Validators.required),
            orderStatus: new FormControl('', Validators.required),



        });

        this.route.params.subscribe((params) => {
            const commandeId = params['id'];

            if (commandeId) {
                this.isUpdating = true;
                this.commandeDetailsForm = new FormGroup({
                    user: new FormControl('', Validators.required),
                    address: new FormControl('', Validators.required),
                    city:  new FormControl('',  Validators.required),
                    phoneNumber: new FormControl('', Validators.required),
                    postalCode: new FormControl('', Validators.required),
                    orderItems: this.formBuilder.array([]), // Initialize an empty FormArray
                    taxPrice: new FormControl('', Validators.required),
                    shippingPrice: new FormControl('', Validators.required),
                    country: new FormControl('', Validators.required),
                    totalPrice: new FormControl('', Validators.required),
                    itemsPrice: new FormControl('', Validators.required),
                    orderStatus: new FormControl('', Validators.required),
                });
                this.commandeService.getCommande(commandeId).subscribe((commande: any) => {
                    commande.orderItems.forEach((i) => {
                        this.inputFields.push(
                           i
                        );
                    });
                    this.commandeDetailsForm.patchValue({
                    user: commande.user ,
                    address: commande.address ,
                    city: commande.city  ,
                    phoneNumber: commande.phoneNumber,
                    postalCode: commande.postalCode,
                    orderItems: commande.orderItems,
                    taxPrice: commande.taxPrice,
                    shippingPrice: commande.shippingPrice,
                    country: commande.country,
                    totalPrice: commande.totalPrice,
                    itemsPrice: commande.itemsPrice,
                    orderStatus: commande.orderStatus,


                    });
                });

            }
        });

        console.log("orderItems5646464",this.orderItems);

    }

    addOrderItemsToForm(item: any) {
        this.orderItems.push(
          this.formBuilder.group(
             ['', [Validators.required]],
          )
        );
      }

      removeOrderItems(index: number) {
        this.orderItems.removeAt(index);
      }


    goToCommandesList() {
        this.router.navigateByUrl('/commandes');
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
        this.commandeDetailsForm.disable();
        const obj = this.inputFields;
        console.log("this.inputFields: ",this.inputFields)
        // this.inputFields.forEach((element) => {
        //     if (obj[element.key]) {
        //         const existingValue = obj[element.key];
        //         const new_value = existingValue + element.value
        //         obj[element.key]=  new_value;
        //     } else {
        //         obj[element.key] = element.value;
        //     }
        // });
        const json = JSON.stringify(obj);
        const formData = new FormData();
        formData.append('user', this.commandeDetailsForm.get('user').value);
        formData.append('address', this.commandeDetailsForm.get('address').value);
        formData.append('phoneNumber', this.commandeDetailsForm.get('phoneNumber').value);
        formData.append('postalCode', this.commandeDetailsForm.get('postalCode').value);
        formData.append('taxPrice', this.commandeDetailsForm.get('taxPrice').value);
        formData.append('shippingPrice', this.commandeDetailsForm.get('shippingPrice').value);
        formData.append('country', this.commandeDetailsForm.get('country').value);
        formData.append('totalPrice', this.commandeDetailsForm.get('totalPrice').value);
        formData.append('itemsPrice', this.commandeDetailsForm.get('itemsPrice').value);
        formData.append('orderStatus', this.commandeDetailsForm.get('orderStatus').value);
        formData.append('orderItems', json);

        if (this.isUpdating) {
            const commandeId = this.route.snapshot.params['id'];
            this.commandeService.updateCommande(commandeId, formData).subscribe(
                () => {
                    this.goToCommandesList();
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
                    this.commandeDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        } else {
            // Perform add operation
            this.commandeService.addCommande(formData).subscribe(
                () => {
                    this.goToCommandesList();
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
                    this.commandeDetailsForm.enable();
                    this.showAlert = true;
                }
            );
        }
    }
}