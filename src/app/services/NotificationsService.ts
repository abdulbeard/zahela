import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { HttpClient, HttpResponse } from "@angular/common/http"
import { environment } from '../../environments/environment'
import { Subject } from "rxjs";

@Injectable()
export class NotificationsService {
    constructor(private http: Http, private httpClient: HttpClient){}

    public getNotificationCountForUser(): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(`${environment.backendUrl}/user/notificationcount`, {observe: 'response'});
    }

    private static notificationCount: number;
    private static notificationCountSubject: Subject<number> = new Subject<number>();
    public static NotificationCount : Observable<number> = NotificationsService.notificationCountSubject.asObservable();
    public static updateNotificationCount(notificationCount: number) {
        NotificationsService.notificationCount = notificationCount;
        this.notificationCountSubject.next(notificationCount);
    }
}