import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { assign, result } from 'lodash-es';
import { ScrumboardService } from 'app/modules/admin/scrumboard/scrumboard.service';
import { Board, Card, Label } from 'app/modules/admin/scrumboard/scrumboard.models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';



@Component({
    selector       : 'scrumboard-card-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrumboardCardDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;
    board: Board;
    card: Card;
    cardForm: FormGroup;
    labels: Label[];
    filteredLabels: Label[];
    reclamation :any;



    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<ScrumboardCardDetailsComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _scrumboardService: ScrumboardService,
        private router: Router,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

       
     
        // Get the board
        this._scrumboardService.board$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((board) => {

                // Board data
                this.board = board;

                // Get the labels
                this.labels = this.filteredLabels = board.labels;
            });

        // Get the card details
       

            this._scrumboardService.getCards(this.router.url.replace(/.*\/card\/(\w+).*/, "$1"))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((card) => {
                this.card = {
                    "id": card._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "listId": "64b726b7b7330f0d7ec2b080",
                    "position": 262144,
                    "title": "Réclamation concernant la non-réception du box d'ingrédie",
                    "labels": [
                        {
                            "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                            "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                            "title": "Incorrect Quantity"
                        }
                    ],
                    "dueDate": "2023-07-18T22:00:00.000Z",
                    "description": ""
                };
                
                
            });

        // Prepare the card form
        this.cardForm = this._formBuilder.group({
            id         : [''],
            title      : ['', Validators.required],
            description: [''],
            labels     : [[]],
            dueDate    : [null]
        });

        // Fill the form
        this._scrumboardService.getReclamation(this.router.url.replace(/.*\/card\/(\w+).*/, "$1")).subscribe
        ((rec)=>
        {
            this.reclamation=rec;
            console.log(this.reclamation.description)
            this.cardForm.setValue({
                id         : this.card.id,
                title      : this.reclamation.description,
                description: '',
                labels     : this.card.labels,
                dueDate    : this.card.dueDate
            });
        })
        

        // Update card when there is a value change on the card form
        this.cardForm.valueChanges
            .pipe(
                tap((value) => {

                    // Update the card object
                    this.card = assign(this.card, value);
                }),
                debounceTime(300),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((value) => {

                // Update the card on the server
                this._scrumboardService.updateCard(value.id, value).subscribe();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return whether the card has the given label
     *
     * @param label
     */
    hasLabel(label: Label): boolean
    {
        return !!this.card.labels.find(cardLabel => cardLabel.id === label.id);
    }

    /**
     * Filter labels
     *
     * @param event
     */
    filterLabels(event): void
    {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the labels
        this.filteredLabels = this.labels.filter(label => label.title.toLowerCase().includes(value));
    }

    /**
     * Filter labels input key down event
     *
     * @param event
     */
    filterLabelsInputKeyDown(event): void
    {
        // Return if the pressed key is not 'Enter'
        if ( event.key !== 'Enter' )
        {
            return;
        }

        // If there is no label available...
        if ( this.filteredLabels.length === 0 )
        {
            // Return
            return;
        }

        // If there is a label...
        const label = this.filteredLabels[0];
        const isLabelApplied = this.card.labels.find(cardLabel => cardLabel.id === label.id);

        // If the found label is already applied to the card...
        if ( isLabelApplied )
        {
            // Remove the label from the card
            this.removeLabelFromCard(label);
        }
        else
        {
            // Otherwise add the label to the card
            this.addLabelToCard(label);
        }
    }

    /**
     * Toggle card label
     *
     * @param label
     * @param change
     */
    toggleProductTag(label: Label, change: MatCheckboxChange): void
    {
        if ( change.checked )
        {
            this.addLabelToCard(label);
        }
        else
        {
            this.removeLabelFromCard(label);
        }
    }

    /**
     * Add label to the card
     *
     * @param label
     */
    addLabelToCard(label: Label): void
    {
        // Add the label
        this.card.labels.unshift(label);

        // Update the card form data
        this.cardForm.get('labels').patchValue(this.card.labels);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove label from the card
     *
     * @param label
     */
    removeLabelFromCard(label: Label): void
    {
        // Remove the label
        this.card.labels.splice(this.card.labels.findIndex(cardLabel => cardLabel.id === label.id), 1);

        // Update the card form data
        this.cardForm.get('labels').patchValue(this.card.labels);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Check if the given date is overdue
     */
    isOverdue(date: string): boolean
    {
        return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any>
    {
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

    onSendClick(){
        const descriptionValue = this.cardForm.get('description').value;
        this._scrumboardService.getReclamation(this.router.url.replace(/.*\/card\/(\w+).*/, "$1")).subscribe
        ((rec)=>
        {
            this._scrumboardService.postMessage(rec.user,this.router.url.replace(/.*\/card\/(\w+).*/, "$1"),{message:descriptionValue}).subscribe();
          // console.log('aaaa'+)
          //"648c66938f0e146262dacfcf"
           this.cardForm.get('description').setValue('');
           
        }
        
        )
    }
    replayReclamation()
    {
     
    }
}
