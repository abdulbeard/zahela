import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GalleryImage } from "../models/GalleryImage";

@Injectable()
export class GalleryService {
    constructor(private httpClient: HttpClient){}

    getAllEntries(): Observable<Array<GalleryImage>> {
        return this.httpClient.get<Array<GalleryImage>>(`${environment.backendUrl}/gallery`);
    }
}