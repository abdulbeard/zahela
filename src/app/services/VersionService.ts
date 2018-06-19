import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class VersionService {
    constructor(private http: Http, private jwtHelper: JwtHelper) { }
    private static lastChecked = new Date();

    checkForVersionChange(): Observable<boolean> {
        let headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        if (new Date().getTime() - VersionService.lastChecked.getTime() > 600000) { //10mins
            return this.http.get(`${environment.backendUrl}/frontend/version`, options).map(x => {
                console.log('hey, im loggin here!');
                VersionService.lastChecked = new Date();
                return x.json() !== environment.currentVersion;
            }, error => { 
                VersionService.lastChecked = new Date(); 
                console.log(error); })
            .catch((err, caught) => {
                VersionService.lastChecked = new Date();
                return Observable.of(false);
            })
        }
        else {
            return Observable.of(false);
        }
    }
}