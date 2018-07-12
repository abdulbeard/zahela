import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User } from "../models/CurrentUser";

@Injectable()
export class FriendsService {
    constructor() {
        this.friend.Username = "Abdul Beard";
        this.friend1.Username = "Abdul Beard1";
        this.friend2.Username = "Abdul Beard2";
        this.friend3.Username = "Abdul Beard3";
        this.friend4.Username = "Abdul Beard4";
    }
    getFriendsForUser() : Observable<Array<User>> {
        return Observable.of([
            this.friend, 
            this.friend1, 
            this.friend2, 
            this.friend3, 
            this.friend4,
        ]);
    }

    getGuestById(id: string) : Observable<User> {
        if(id === this.friend.Username){
            return Observable.of(this.friend);
        }
        if(id === this.friend1.Username){
            return Observable.of(this.friend1);
        }
        if(id === this.friend2.Username){
            return Observable.of(this.friend2);
        }
        if(id === this.friend3.Username){
            return Observable.of(this.friend3);
        }
        if(id === this.friend4.Username){
            return Observable.of(this.friend4);
        }
        return Observable.of(User.default());
    }

    friend: User = User.default();
    friend1: User = User.default();
    friend2: User = User.default();
    friend3: User = User.default();
    friend4: User = User.default();
}