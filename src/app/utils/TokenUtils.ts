import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { CookieUtils } from "./CookieUtils";
import { JwtHelper } from "angular2-jwt";

export class TokenUtils {
    constructor(){}

    private static token: string;
    private static tokenSubject: Subject<string> = new Subject<string>();
    public static tokenObservable: Observable<string> = TokenUtils.tokenSubject.asObservable();
    public static setToken(token: string) {
        console.log('setting token to: ', token);
        this.token = token;
        this.tokenSubject.next(token);
        CookieUtils.setCookie("access-token", token, 7);
        this.decodeToken(token);
    }

    public static decodeToken(token: string) {
        var helper = new JwtHelper();
        var decodedToken = helper.decodeToken(token);
        console.log(decodedToken);
        console.log(JSON.parse(decodedToken.user));
    }

    public static getToken(): string {
        if(this.token){
            return this.token;
        }
        var cookieToken = CookieUtils.getCookie("access-token");
        if(cookieToken){
            this.token = cookieToken;
            return cookieToken;
        }
    }
}