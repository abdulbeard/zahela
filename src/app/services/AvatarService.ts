import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AvatarService {
    constructor(private http: Http, private httpClient: HttpClient) { }

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

    // uploadMultiple(fileList: FileList): Observable<Array<string>>{
    //     const uploadData = new FormData();
    //     for(var i = 0; i < fileList.length; i++ ){
    //         uploadData.append('myFile', fileList[i], fileList[i].name);
    //     }
    //     return this.httpClient.post<Array<string>>(`${environment.backendUrl}/image/upload/multiple`, uploadData, 
    //     // {
    //     //     headers: headers,
    //     //     observe: 'events',
    //     //     reportProgress: true
    //     // }
    //     );
    // }

    getImageChoicesForUser(): Observable<Response> {
        return null;
    }
}