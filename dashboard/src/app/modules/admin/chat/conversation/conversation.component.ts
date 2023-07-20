import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ChatService } from '../chat.service';
import { Chat } from '../chat.types';
import { MessageService } from 'app/core/chat/Message.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from 'app/core/user/user.service';


@Component({
    selector: 'chat-conversation',
    templateUrl: './conversation.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit, OnDestroy {
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: Chat;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    messages: any;
    user:any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _ngZone: NgZone,
        private messageService: MessageService,
        private router: Router,
        private userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Detect the changes so the height is applied
                this._changeDetectorRef.detectChanges();

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

                // Detect the changes one more time to apply the final height
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.router.events
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.loadChatConversation();
                }
            });


        // Chat
        this.loadChatConversation();

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
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
     * Load the chat conversation
     */
    private loadChatConversation(): void {
        this.chat = null;
        if(this.router.url.replace('/chat/', '')!="/chat")
        {

            this.userService
        .getUser(this.router.url.replace('/chat/', ''))
        .subscribe(
            (data: any) => {
                this.user = data;
               
            
            },
            (err) => {
                console.log('errors: ', err);
            }
        );
       
        const chatId = this.router.url.replace('/chat/', '');
        this.messageService.getMessage(chatId).subscribe((messages) => {
            this.chat = {
                id: "e3127982-9e53-4611-ac27-eb70c84be4aa",
                contactId: "b62359fd-f2a8-46e6-904e-31052d1cd675",
                unreadCount: 0,
                muted: false,
                lastMessage: this.user.email,
                lastMessageAt: "26/04/2021",
                contact: {
                    id: "b62359fd-f2a8-46e6-904e-31052d1cd675",
                    avatar: this.user.avatar,
                    name: this.user.name,
                    about: "Hi there! I'm using FuseChat.",
                    details: {
                        emails: [
                            {
                                email: "josephstrickland@mail.io",
                                label: "Personal",
                            },
                            {
                                email: "strickland.joseph@bytrex.us",
                                label: "Work",
                            },
                        ],
                        phoneNumbers: [
                            {
                                country: "jo",
                                phoneNumber: "990 450 2729",
                                label: "Mobile",
                            },
                        ],
                        title: "Hotel Manager",
                        company: "Bytrex",
                        birthday: "1991-09-08T12:00:00.000Z",
                        address: "844 Ellery Street, Hondah, Texas, PO1272",
                    },
                    attachments: {
                        media: [
                            "assets/images/cards/01-320x200.jpg",
                            "assets/images/cards/02-320x200.jpg",
                            "assets/images/cards/03-320x200.jpg",
                            "assets/images/cards/04-320x200.jpg",
                            "assets/images/cards/05-320x200.jpg",
                            "assets/images/cards/06-320x200.jpg",
                            "assets/images/cards/07-320x200.jpg",
                            "assets/images/cards/08-320x200.jpg",
                        ],
                        docs: [],
                        links: [],
                    },
                },
                messages: messages,
            };
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

        }
        
    }

    /**
     * Open the contact info
     */
    openContactInfo(): void {
        // Open the drawer
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Reset the chat
     */
    resetChat(): void {
        this._chatService.resetChat();

        // Close the contact info in case it's opened
        this.drawerOpened = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle mute notifications
     */
    toggleMuteNotifications(): void {
        // Toggle the muted
        this.chat.muted = !this.chat.muted;

        // Update the chat on the server
        this._chatService.updateChat(this.chat.id, this.chat).subscribe();
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

    @ViewChild('messageInput') messageInputRef: ElementRef;

    resetTextarea() {
      const textareaElement: HTMLTextAreaElement = this.messageInputRef.nativeElement;
      const textareaValue = textareaElement.value;
  
    
      const message={
        message:textareaValue
      }
      this.messageService.postMessage(this.router.url.replace('/chat/', ''),message).subscribe(()=>{});
  
      // Reset the textarea
      textareaElement.value = '';
      this.loadChatConversation();
      this.loadChatConversation();
    
    }
  
}
