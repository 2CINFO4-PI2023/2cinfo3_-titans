import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { CommandeService } from 'app/core/commande/commande.service';
import { PlatService } from 'app/core/plat/plat.service';

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
    orderItems: any;
    orderItemsArray: FormArray;

    constructor(
        private commandeService: CommandeService,
        private platService: PlatService,
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
          this.orderItemsArray = this.commandeDetailsForm.get('orderItems') as FormArray;
    }


    ngOnInit(): void {
        this.commandeService.getCommandes().subscribe(
            (data) => {
                this.orderItems = data;

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
                    commande.orderItems.forEach((item) => {
                        Object.keys(commande.orderItems).forEach((i) => {
                            this.platService.getPlat(commande.orderItems[i].plat).subscribe((plat: any) => {
                             const newValue =   {...commande.orderItems[i],name:plat.name,price: plat.price, image:plat.image};
                            this.inputFields.push({
                                key: i,
                                value: newValue,
                            });
                        });
                        });
                        console.log("item",commande.orderItems);
                        console.log("inputfields",this.inputFields);

                    });
                    this.commandeDetailsForm.patchValue({
                    user: commande.user ,
                    address: commande.shippingInfo.address ,
                    city: commande.shippingInfo.city  ,
                    phoneNumber: commande.shippingInfo.phoneNumber,
                    postalCode: commande.shippingInfo.postalCode,
                    orderItems: this.inputFields,
                    taxPrice: commande.taxPrice,
                    shippingPrice: commande.shippingPrice,
                    country: commande.shippingInfo.country,
                    totalPrice: commande.totalPrice,
                    itemsPrice: commande.itemsPrice,
                    orderStatus: commande.orderStatus,


                    });
                });

            }
        });
        console.log("inputfielss",this.inputFields);


    }

    addIngredientToForm(plat: any) {
        this.orderItemsArray.push(
          this.formBuilder.group({
            key: [plat._id],
            value: ['', [Validators.required, Validators.min(1)]],
          })
        );
      }

      removeOrderItems(index: number) {
        this.orderItemsArray.removeAt(index);
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
        let obj = {};
        const commandeOrderItems = [];
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
        // commandeOrderItems.push(Object.values(obj));
        const json =JSON.stringify( Object.values(obj));
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
        // formData.append('orderItems', json);
        console.log("json",commandeOrderItems,json);
        console.log("commandeDetailsForm",this.commandeDetailsForm);
        let object = {};
formData.forEach((value, key) => object[key] = value);
var finaljson = object;
        if (this.isUpdating) {
            const commandeId = this.route.snapshot.params['id'];
            this.commandeService.updateCommande(commandeId, finaljson).subscribe(
                (res) => {
                    console.log("res",res);
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