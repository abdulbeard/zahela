import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'

@Injectable()
export class VersionService {
    constructor(private http: Http) { }
    private static lastChecked = new Date();

    checkForVersionChange(): Observable<boolean> {
        let headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        if (new Date().getTime() - VersionService.lastChecked.getTime() > 10000) { //600000
            return this.http.get(`${environment.backendUrl}/frontend/version`, options).map(x => {
                console.log('hey, im loggin here!');
                VersionService.lastChecked = new Date();
                return x.json() !== environment.currentVersion;
            }, error => { console.log('failure', error);VersionService.lastChecked = new Date(); })
        }
        else {
            return Observable.of(false);
        }
    }
}