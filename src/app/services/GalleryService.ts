import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GalleryImage } from "../models/GalleryImage";

@Injectable()
export class GalleryService {
    constructor(private httpClient: HttpClient){}

    getAllEntries(legacy: boolean = false): Observable<Array<GalleryImage>> {
        var url = `${environment.backendUrl}/gallery${legacy ? "?legacy=true" : ""}`;
        return this.httpClient.get<Array<GalleryImage>>(url);
    }
}