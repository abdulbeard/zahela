import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { Recipe, Ingredient, IngredientMeasure, Stage, Step, RecipeDescription } from "../models/Recipe";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { PlaylistEntry } from "../models/PlaylistEntry";
import { environment } from "../../environments/environment";

@Injectable()
export class PlaylistService {
    constructor(private httpClient: HttpClient){}

    getAllEntries(): Observable<Array<PlaylistEntry>> {
        return this.httpClient.get<Array<PlaylistEntry>>(`${environment.backendUrl}/playlist/approved`);
    }

    addEntry(entry: PlaylistEntry): Observable<PlaylistEntry> {
        return this.httpClient.post<PlaylistEntry>(`${environment.backendUrl}/playlist`, entry);
    }

    updateEntry(entry: PlaylistEntry): Observable<PlaylistEntry> {
        return this.httpClient.put<PlaylistEntry>(`${environment.backendUrl}/playlist`, entry);
    }
}