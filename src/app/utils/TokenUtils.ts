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
        CookieUtils.deleteCookie("access-token");
        this.token = null;
    }

    public static setToken(token: string) {
        this.token = token;
        this.tokenSubject.next(token);
        CookieUtils.setCookie("access-token", token, 7);
        this.decodeToken(token);
    }

    public static decodeToken(token: string) {
        var helper = new JwtHelper();
        var decodedToken = helper.decodeToken(token);
        var user = <User> JSON.parse(decodedToken.user);
        console.log(user);
        UserSessionService.setCurrentUser(user);
    }

    public static getToken(): string {
        if (this.token){
            return this.token;
        }
        var cookieToken = CookieUtils.getCookie("access-token");
        if(cookieToken){
            this.token = cookieToken;
            return cookieToken;
        }
    }
}