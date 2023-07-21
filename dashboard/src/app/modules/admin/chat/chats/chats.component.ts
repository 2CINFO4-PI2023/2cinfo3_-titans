import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { Chat, Profile } from '../chat.types';
import { MessageService } from 'app/core/chat/Message.service';
import { UserService } from 'app/core/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'chat-chats',
  templateUrl: './chats.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy {
  chats: Chat[];
  drawerComponent: 'profile' | 'new-chat';
  drawerOpened: boolean = false;
  filteredChats: Chat[];
  profile: Profile;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  usersDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['name', 'email', 'phone', 'role', 'status', 'actions'];
  roles = {
    1: 'Client',
    99: 'Admin',
  };
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  filterValues: { [key: string]: string } = {
    email: '',
    name: '',
    role: '',
    phone: '',
  };
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  isLoading: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _chatService: ChatService,
    private _changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private userService: UserService,
    
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._chatService.profile$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((profile: Profile) => {
        this.profile = profile;
        this._changeDetectorRef.markForCheck();
      });

    this.getUsers();
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
   * Filter the chats
   *
   * @param query
   */

  /**
   * Open the new chat sidebar
   */
  openNewChat(): void {
    this.drawerComponent = 'new-chat';
    this.drawerOpened = true;
  }

  /**
   * Open the profile sidebar
   */
  openProfile(): void {
    this.drawerComponent = 'profile';
    this.drawerOpened = true;
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

  

  getUsers(): void {
    this.isLoading = true; // Set isLoading to true when fetching users
    this.userService.getUsers(this.currentPage, this.pageSize, this.filterValues, this.sortField, this.sortOrder)
      .subscribe(
        (data: any) => {
          this.chats = this.filteredChats = data.users.map((user: any) => {
            return {
              id: user._id,
              unreadCount: 2, // Set the appropriate value for unreadCount
              muted: false, // Set the appropriate value for muted
              lastMessage: user.email, // Set the appropriate value for lastMessage
              lastMessageAt: user.phone?"+216 "+user.phone:"", // Set the appropriate value for lastMessageAt
              contact: {
                id: user.id,
                avatar: user.image,
                name: user.name,
                about: "Hi there! I'm using FuseChat.",
                details: {
                  emails: [
                    {
                      email: "bernardlangley@mail.com",
                      label: "Personal"
                    },
                    {
                      email: "langley.bernard@boilcat.name",
                      label: "Work"
                    }
                  ],
                  phoneNumbers: [
                    {
                      country: "md",
                      phoneNumber: "893 548 2862",
                      label: "Mobile"
                    }
                  ],
                  title: "Electromedical Equipment Technician",
                  company: "Boilcat",
                  birthday: "1988-05-26T12:00:00.000Z",
                  address: "943 Adler Place, Hamilton, South Dakota, PO5592"
                },
                attachments: {}
              }
            };
          });
          this.totalItems = data.total;
          this.isLoading = false; // Set isLoading to false after fetching users
          this.loadPage();
          this._changeDetectorRef.markForCheck();
        },
        (err) => {
          console.log('errors: ', err);
          this.isLoading = false; // Set isLoading to false in case of error
        }
      );
  }

  loadPage(): void {
    // Implement your logic to load the page here
  }
}
