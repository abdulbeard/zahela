import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { CookieUtils } from "./CookieUtils";

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