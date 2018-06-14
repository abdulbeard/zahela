import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'

@Injectable()
export class AvatarService {
    constructor(private http: Http) { }

    uploadImage(imagePayload: any): Observable<Response> {
        console.log(imagePayload);
        let headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        var json = JSON.stringify(imagePayload);
        console.log(json);
        return this.http.post(`${environment.backendUrl}/image/upload/avatar/base64`, json, options);
    }

    getImageChoicesForUser(): Observable<Response> {
        return null;
    }
}