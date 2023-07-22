import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { map, switchMap, take, tap } from 'rxjs/operators';
import Pusher, { Channel } from 'pusher-js';
import { Ingredient } from "../../../core/ingredient/ingredient.types";
import { environment } from "environments/environment";
@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    private _pusher = new Pusher(environment.PUSHER_APP_KEY, {cluster: environment.PUSHER_APP_CLUSTER});
    private _channel = this._pusher.subscribe(environment.PUSHER_CHANNEL);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<Notification[]>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(): Observable<Ingredient[]>
    {
        return this._httpClient.get<Ingredient[]>(`${environment.baseUrl}ingredient/outofstock`).pipe(
            tap((notifications) => {
                console.log(notifications)
                let notify :Notification[] = []
                let i =0;
                for (var key of notifications) {
                    let notification:Notification = {
                        id : (i+1).toString(),
                        title : <string>key.name,
                        time : new Date().toLocaleString(),
                        image: <string>key.image,
                        read : false,
                        description : `the ${key.name} is nearly out of stock, there are only ${key.quantity} left.`
                    };
                    notify.push(notification)
                }
                this._notifications.next(notify);
            })
        );
    }

    /**
     * Create a notification
     *
     * @param notification
     */
    create(notification: Notification): Observable<Notification>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.post<Notification>('api/common/notifications', {notification}).pipe(
                map((newNotification) => {

                    // Update the notifications with the new notification
                    this._notifications.next([...notifications, newNotification]);

                    // Return the new notification from observable
                    return newNotification;
                })
            ))
        );
    }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id: string, notification: Notification): Observable<Notification>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.patch<Notification>('api/common/notifications', {
                id,
                notification
            }).pipe(
                map((updatedNotification: Notification) => {

                    // Find the index of the updated notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Update the notification
                    notifications[index] = updatedNotification;

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated notification
                    return updatedNotification;
                })
            ))
        );
    }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.delete<boolean>('api/common/notifications', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Delete the notification
                    notifications.splice(index, 1);

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.get<boolean>('api/common/notifications/mark-all-as-read').pipe(
                map((isUpdated: boolean) => {

                    // Go through all notifications and set them as read
                    notifications.forEach((notification, index) => {
                        notifications[index].read = true;
                    });

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated status
                    return isUpdated;
                })
            ))
        );
    }
}
