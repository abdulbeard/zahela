import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { HttpClient, HttpResponse } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Subject } from "rxjs";
import { UserSessionService } from "./UserSessionService";

@Injectable()
export class NotificationsService {
    constructor(private http: Http, private httpClient: HttpClient){}

    public getNotificationCountForUser(): Observable<HttpResponse<number>> {
        var user = UserSessionService.getCurrentUser();
        var userId = user ? user.Id : "";
        return this.httpClient.get<number>(`${environment.backendUrl}/user/notificationcount/${userId}`, {observe: 'response'});
    }

    private static notificationCount: number;
    private static notificationCountSubject: Subject<number> = new Subject<number>();
    public static NotificationCount : Observable<number> = NotificationsService.notificationCountSubject.asObservable();
    public static updateNotificationCount(notificationCount: number) {
        NotificationsService.notificationCount = notificationCount;
        this.notificationCountSubject.next(notificationCount);
    }
    public static getCurrentNotificationCount() : number {
        return this.notificationCount;
    }
}