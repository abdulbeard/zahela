import { Injectable } from "@angular/core";
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { Observable } from "rxjs";
import { Routes } from '../constants/Routes';
import { CurrentUser } from "../models/CurrentUser";
import { CookieUtils } from "../utils/CookieUtils";

@Injectable()
export class AuthService implements CanActivate, CanLoad {
    loggedIn: boolean = false;
    currentUser: CurrentUser;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isAllowedAccess(route, state);
    }

    canLoad(route: Route): boolean {
        return true;
        //return this.isAllowedAccess(route);
    }

    private isAllowedAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(route);
        console.log(state);
        var user = this.getCurrentUser();
        if (state.url === `/${Routes.friends}`) {
        }
        else {
            let navigationExtras: NavigationExtras = {
                queryParams: { 'cheater': "true", 'returnUrl': state.url },
                preserveQueryParams: true,
            };
            console.log("unauthorized");
            // Navigate to the login page with extras
            this.router.navigate([Routes.login], navigationExtras);
            return false;
        }
        return true;
    }

    private getCurrentUser(): CurrentUser {
        return null;
    }

    private isInUrlList(url: string, urlList: string[], addForwardSlash?: boolean){
        for (var i = 0; i < urlList.length; i++) {
            var currentUrl = urlList[i];
            currentUrl = addForwardSlash ? `/${currentUrl}` : currentUrl;
            if(url.startsWith(currentUrl)){
                console.log("url matched");
                return true;
            }
        }
    }

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public login(username: string, password: string): boolean {
        this.loggedIn = true;

        console.log(`${username}:${password}`);
        if (username === "AbdulTheBauss" && password === "YodaSaysIs") {
            console.log("setting cookiee");
            CookieUtils.setCookie("user", "SuperUser", 365, "");
            return true;
        }
        return false;
    }

    public logout() {
        CookieUtils.deleteCookie("user");
        this.loggedIn = false;
        this.router.navigate([Routes.home]);
    }
}