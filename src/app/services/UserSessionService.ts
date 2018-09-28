import { Injectable } from "@angular/core";
import { User, CurrentUser, UserType } from "../models/CurrentUser";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { TokenUtils } from "../utils/TokenUtils";
import { UserPermissions, UserPermission } from "../constants/UserPermissions";


@Injectable()
export class UserSessionService {
    constructor() {
    }

    private static userSubject: Subject<User> = new Subject<User>();
    public static userObservable: Observable<User> = UserSessionService.userSubject.asObservable();

    private static currentUser: User;
    
    static setCurrentUser(user: User) {
        this.currentUser = user;
        this.userSubject.next(user);
    }

    static getCurrentUser() : User {
        return this.currentUser;
    }

    static detectCurrentUser() {
        var token = TokenUtils.getToken();
        if(!this.currentUser) {
            TokenUtils.decodeToken(token);
        }
        var user = TokenUtils.tokenToUser(token);
        var userSessionsUser = UserSessionService.getCurrentUser();
        if(user && userSessionsUser && user.Id !== userSessionsUser.Id){
            TokenUtils.decodeToken(token);
        }
    }

    public static userIsLoggedIn() : boolean {
        return !!this.currentUser && !(this.currentUser.Type === UserType.GuestUser);
    }

    public static logout() {
        this.currentUser = null;
        TokenUtils.deleteAccessToken();
    }

    public static getCurrentUserAndPermissions() : CurrentUser {
        if (this.currentUser){
            return new CurrentUser(this.GetUserPermissions(this.currentUser.Type), this.currentUser, true);
        }
        return new CurrentUser(UserPermission.default(), User.default(), false);
    }

    public static GetUserPermissions(userType: UserType) : UserPermission {
        switch(userType){
            case(UserType.Admin):{
                return UserPermissions.Admin;
            }
            case(UserType.GuestUser):{
                return UserPermissions.Guest;
            }
            case(UserType.Posse):{
                return UserPermissions.Guest                
            }
            case(UserType.RegisteredUser):{
                return UserPermissions.RegisteredUser;
            }
        }
        return UserPermission.default();
    }
}