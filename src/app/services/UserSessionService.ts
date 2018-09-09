import { Injectable } from "@angular/core";
import { RSVPStatus, User } from "../models/CurrentUser";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserSessionService {
    constructor(private httpClient: HttpClient) {
    }

    private static currentUser: User;
    
    static setCurrentUser(user: User) {
        this.currentUser = user;
    }

    static getCurrentUser() : User {
        return this.currentUser;
    }
}