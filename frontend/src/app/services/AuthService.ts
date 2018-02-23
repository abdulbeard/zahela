import { Injectable } from "@angular/core";
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { Observable } from "rxjs";

@Injectable()
export class AuthService implements CanActivate, CanActivateChild, CanLoad {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(route);
        console.log(state);
        if (state.url === "/friends") {
            var userCookie = AuthService.getCookie("user");
            console.log(userCookie);
            if (userCookie === "SuperUser") {
                console.log("authorized");
                return true;
            }
            else {
                let navigationExtras: NavigationExtras = {
                    queryParams: { 'cheater': "true" },
                    fragment: 'anchor'
                };
                console.log("unauthorized");
                // Navigate to the login page with extras
                this.router.navigate(['/login'], navigationExtras);
                return false;
            }
        }
        if (state.url !== "hukaChaka/allow") {
            console.log(state);
            return false;
        }
        return true;

        // let navigationExtras: NavigationExtras = {
        //     queryParams: { 'session_id': "superSecretSessionId" },
        //     fragment: 'anchor'
        // };

        // // Navigate to the login page with extras
        // //this.router.navigate(['/home'], navigationExtras);
        // return true;
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (state.url !== "hukaChaka/allow") {
            return false;
        }
        return true;
    }
    canLoad(route: Route): boolean {
        console.log(route);
        if (`/${route.path}` !== "/hukaChaka/allow") {
            return false;
        }
        return true;
    }
    constructor(private router: Router) { }

    public static deleteCookie(name) {
        AuthService.setCookie(name, '', -1);
    }

    public static setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

    public static getCookie(name: string): string {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }
}