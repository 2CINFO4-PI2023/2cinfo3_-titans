import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ScrumboardService } from 'app/modules/admin/scrumboard/scrumboard.service';
import { Board, Card, List } from 'app/modules/admin/scrumboard/scrumboard.models';


@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
    board: Board;
    listTitleForm: FormGroup;
    statutList: any;
   
    newStatus: any;
    progressStatus: any;
    completedStatus: any;
    rejectedStatus: any;
    holdStatus: any;
    newStatusStatus: any;


    // Private
    private readonly _positionStep: number = 65536;
    private readonly _maxListCount: number = 200;
    private readonly _maxPosition: number = this._positionStep * 500;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _scrumboardService: ScrumboardService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._scrumboardService.getstatus( "New Raclamation").subscribe(
            stat => {
                this.newStatus = stat

            }
        )

        this._scrumboardService.getstatus( "In progress").subscribe(
            stat => {
                this.progressStatus = stat

            }
        )
        this._scrumboardService.getstatus( "Rejected").subscribe(
            stat => {
                this.rejectedStatus = stat

            }
        )
        this._scrumboardService.getstatus( "Completed").subscribe(
            stat => {
                this.completedStatus = stat

            }
        )
       
        this._scrumboardService.getstatus( "On Hold").subscribe(
            stat => {
                this.holdStatus = stat

            }
        )
        
        





        // Initialize the list title form
        this.listTitleForm = this._formBuilder.group({
            title: ['']
        });

        // Get the board


        this._scrumboardService.getlistReclamation().subscribe(
            rec => {
                this.board = this.getCards(rec)
                //   console.log(this.board )
            }

        )

    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Focus on the given element to start editing the list title
     *
     * @param listTitleInput
     */
    renameList(listTitleInput: HTMLElement): void {
        // Use timeout so it can wait for menu to close
        setTimeout(() => {
            listTitleInput.focus();
        });
    }

    /**
     * Add new list
     *
     * @param title
     */
    addList(title: string): void {
        // Limit the max list count
        if (this.board.lists.length >= this._maxListCount) {
            return;
        }

        // Create a new list model
        const list = new List({
            boardId: this.board.id,
            position: this.board.lists.length ? this.board.lists[this.board.lists.length - 1].position + this._positionStep : this._positionStep,
            title: title
        });

        // Save the list
        this._scrumboardService.createList(list).subscribe();
    }

    /**
     * Update the list title
     *
     * @param event
     * @param list
     */
    updateListTitle(event: any, list: List): void {
        // Get the target element
        const element: HTMLInputElement = event.target;

        // Get the new title
        const newTitle = element.value;

        // If the title is empty...
        if (!newTitle || newTitle.trim() === '') {
            // Reset to original title and return
            element.value = list.title;
            return;
        }

        // Update the list title and element value
        list.title = element.value = newTitle.trim();

        // Update the list
        this._scrumboardService.updateList(list).subscribe();
    }

    /**
     * Delete the list
     *
     * @param id
     */
    deleteList(id): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete list',
            message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {

                // Delete the list
                this._scrumboardService.deleteList(id).subscribe();
            }
        });
    }

    /**
     * Add new card
     */
    addCard(list: List, title: string): void {
        // Create a new card model
        const card = new Card({
            boardId: this.board.id,
            listId: list.id,
            position: list.cards.length ? list.cards[list.cards.length - 1].position + this._positionStep : this._positionStep,
            title: title
        });


        // Save the card
        this._scrumboardService.createCard(card).subscribe();
    }

    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<List[]>): void {
        // Move the item
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        this._scrumboardService.updateLists(updated).subscribe();
    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<Card[]>): void {
        // Move or transfer the item
        if (event.previousContainer === event.container) {
            // Move the item
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            // Transfer the item
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

            // Update the card's list it
            event.container.data[event.currentIndex].listId = event.container.id;
        }

        // Calculate the positions
        const updated = this._calculatePositions(event);
        this._scrumboardService.changeStatut(updated[0].id,updated[0].listId).subscribe();

        // Update the cards
        this._scrumboardService.updateCards(updated).subscribe();
    }

    /**
     * Check if the given ISO_8601 date string is overdue
     *
     * @param date
     */
    isOverdue(date: string): boolean {
        return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Calculate and set item positions
     * from given CdkDragDrop event
     *
     * @param event
     * @private
     */
    private _calculatePositions(event: CdkDragDrop<any[]>): any[] {
        // Get the items
        let items = event.container.data;

        const currentItem = items[event.currentIndex];
        const prevItem = items[event.currentIndex - 1] || null;
        const nextItem = items[event.currentIndex + 1] || null;

        // If the item moved to the top...
        if (!prevItem) {
            // If the item moved to an empty container
            if (!nextItem) {
                currentItem.position = this._positionStep;
            }
            else {
                currentItem.position = nextItem.position / 2;
            }
        }
        // If the item moved to the bottom...
        else if (!nextItem) {
            currentItem.position = prevItem.position + this._positionStep;
        }
        // If the item moved in between other items...
        else {
            currentItem.position = (prevItem.position + nextItem.position) / 2;
        }

        // Check if all item positions need to be updated
        if (!Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition) {
            // Re-calculate all orders
            items = items.map((value, index) => {
                value.position = (index + 1) * this._positionStep;
                return value;
            });

            // Return items
            return items;
        }

        // Return currentItem
        return [currentItem];
    }


    getListBoard(list:any,id:any)
    {
       return Array.isArray(list[id]) ?list[id].map(rec => ({
            id: rec._id,
            boardId: "2c82225f-2a6c-45d3-b18a-1132712a4234",
            listId: id,
            position: 65536,
            title: rec.description,
            description: "fix",
            labels: [
                {
                    id: "e0175175-2784-48f1-a519-a1d2e397c9b3",
                    boardId: "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    title: "Quality Issue"
                }
            ],
            dueDate: "2023-07-08T22:00:00.000Z"
        })) : []
        
    }


    getCards(rec) {
        
        const fakeBoardData: Board = {

            

            "id": "2c82225f-2a6c-45d3-b18a-1132712a4234",
            "title": "Admin Dashboard",
            "description": "Roadmap for the new project",
            "icon": "heroicons_outline:template",
            "lastActivity": "2023-07-17T22:00:00.000Z",
            "lists": [
                {
                    "id": this.newStatus._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "position": 65536,
                    "title": this.newStatus.statut,
                    "cards":  this.getListBoard(rec,this.newStatus._id)
                },
                {
                    "id": this.progressStatus._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "position": 131072,
                    "title": "In progress",
                    "cards": this.getListBoard(rec,this.progressStatus._id)
                },
                {
                    "id":this.completedStatus._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "position": 262144,
                    "title": "Completed",
                    "cards": this.getListBoard(rec,this.completedStatus._id)
                },
                {
                    "id": this.rejectedStatus._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "position": 393216,
                    "title": "Rejected",
                    "cards": this.getListBoard(rec,this.rejectedStatus._id)
                },
                {
                    "id": this.holdStatus._id,
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "position": 458752,
                    "title": "On Hold",
                    "cards": this.getListBoard(rec,this.holdStatus._id)
                }
            ],
            "labels": [
                {
                    "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "title": "Quality Issue"
                },
                {
                    "id": "51779701-818a-4a53-bc16-137c3bd7a564",
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "title": "Wrong Ingredient"
                },
                {
                    "id": "e8364d69-9595-46ce-a0f9-ce428632a0ac",
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "title": "Damaged Packaging"
                },
                {
                    "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "title": "Incorrect Quantity"
                },
                {
                    "id": "f9eeb436-13a3-4208-a239-0d555960a567",
                    "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                    "title": "Expired Product"
                }
            ],
            "members": [
                {
                    "name": "",
                    "id": null,
                    "avatar": null
                },
                {
                    "name": "",
                    "id": null,
                    "avatar": null
                },
                {
                    "name": "",
                    "id": null,
                    "avatar": null
                }
            ]
        }
        return fakeBoardData;

    };


}
