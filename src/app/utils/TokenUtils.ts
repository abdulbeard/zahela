import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { CookieUtils } from "./CookieUtils";
import { JwtHelper } from "angular2-jwt";
import { User } from "../models/CurrentUser";
import { AuthService } from "../services/AuthService";
import { UserSessionService } from "../services/UserSessionService";

export class TokenUtils {
    constructor(){}

    private static token: string;
    private static tokenSubject: Subject<string> = new Subject<string>();
    public static tokenObservable: Observable<string> = TokenUtils.tokenSubject.asObservable();

    public static deleteAccessToken() {
        //CookieUtils.deleteCookie("accesstoken");
        localStorage.removeItem('accesstoken');
        this.token = null;
    }

    public static setToken(token: string) {
        this.deleteAccessToken();
        this.token = token;
        this.tokenSubject.next(token);
        
        // CookieUtils.setCookie("accesstoken", token, 7);
        // CookieUtils.setCookie("jhjh", token, 7);
        localStorage.setItem("accesstoken", token);
        
        this.decodeToken(token);
    }

    public static decodeToken(token: string) {
        if(token) {
            var user = this.tokenToUser(token);
            //console.log(user);
            UserSessionService.setCurrentUser(user);
        }
    }

    public static tokenToUser(token: string) : User {
        if(token) {
            var helper = new JwtHelper();
            var decodedToken = helper.decodeToken(token);
            var user = <User> JSON.parse(decodedToken.user);
            return user;
        }
    }

    public static getToken(): string {
        if (this.token){
            return this.token;
        }
        
        //var storedToken = CookieUtils.getCookie("accesstoken");
        var storedToken = localStorage.getItem('accesstoken');
        
        if(storedToken){
            this.token = storedToken;
            return storedToken;
        }
        return '';
    }
}