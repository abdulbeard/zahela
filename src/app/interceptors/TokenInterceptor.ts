import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenUtils } from '../utils/TokenUtils';
import { UserSessionService } from '../services/UserSessionService';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = TokenUtils.getToken();
        var user = UserSessionService.getCurrentUser();
        request = request.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'x-user-id': `${user.Id}`
            })
        });
        return next.handle(request);
    }
}