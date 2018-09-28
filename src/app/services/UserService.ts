import { Injectable } from "@angular/core";
import { RSVPStatus, User } from "../models/CurrentUser";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpResponse } from "@angular/common/http";


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

    updateUser(user: User) : Observable<HttpResponse<User>> {
        return this.httpClient.put<User>(`${environment.backendUrl}/user`, user, {observe: 'response'});
    }

    registerUser(userId: string, password: string) : Observable<any> {
        console.log(userId, password);
        return this.httpClient.post<any>(`${environment.backendUrl}/user/register/${userId}`, {Password: password});
    }

    getUserByUsername(username: string) : Observable<HttpResponse<User>> {
        //return this.httpClient.get<User>(`${environment.backendUrl}/user/${username}`);
        return this.httpClient.get<User>(`${environment.backendUrl}/user/${username}`, {observe: 'response'});
    }

    updateRSVPStatus(user: User, rsvpStatus: RSVPStatus) : Observable<boolean>{
        return this.httpClient.put<boolean>(`${environment.backendUrl}/user/updateRsvpStatus/${user.Id}/${rsvpStatus}`, null);
    }
}