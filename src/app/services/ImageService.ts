import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ImageService {
    constructor(private http: Http, private httpClient: HttpClient) { }

    uploadMultiple(fileList: FileList): Observable<Array<string>>{
        const uploadData = new FormData();
        for(var i = 0; i < fileList.length; i++ ){
            uploadData.append('myFile', fileList[i], fileList[i].name);
        }
        return this.httpClient.post<Array<string>>(`${environment.backendUrl}/image/upload/multiple`, uploadData, 
        // {
        //     headers: headers,
        //     observe: 'events',
        //     reportProgress: true
        // }
        );
    }

    deleteImage(imageUrl: string) : Observable<any>{
        console.log(imageUrl);
        return this.httpClient.delete(`${environment.backendUrl}/image?imageName=${imageUrl}`, {
            responseType: "text"
        });
    }
}