import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'

@Injectable()
export class AvatarService {
    constructor(private http: Http) { }

    uploadImage(imagePayload: any): Observable<Response> {
        let headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        var json = JSON.stringify(imagePayload);
        console.log(json);
        return this.http.post(`${environment.backendUrl}/imageupload/avatar/base64`, json, options);
    }
}