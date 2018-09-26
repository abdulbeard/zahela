import { Injectable } from "@angular/core";
import { RSVPStatus, User } from "../models/CurrentUser";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient){

    }
    
    // getUserInfo(username: string): User{
    //     var img = "";
    //     var commenter = "";
    //     if(username === "U2M3C5HEE"){
    //         img = "https://semantic-ui.com/images/avatar/small/matt.jpg";
    //         commenter = "Zaheer";
    //     }
    //     else if(username === "U2M1EE0Q3"){
    //         img = "https://semantic-ui.com/images/avatar/small/elliot.jpg";
    //         commenter = "Marcela";
    //     }
    //     else if(username === "U2M2V7TQC"){
    //         img = "https://semantic-ui.com/images/avatar/small/jenny.jpg";
    //         commenter = "Charla";
    //     }
    //     return null;
    // }

    getUserByUsername(username: string) : Observable<User> {
        return this.httpClient.get<User>(`${environment.backendUrl}/user/${username}`);
    }

    updateRSVPStatus(user: User, rsvpStatus: RSVPStatus) : Observable<boolean>{
        return this.httpClient.put<boolean>(`${environment.backendUrl}/user/updateRsvpStatus/${user.Id}/${rsvpStatus}`, null);
    }
}