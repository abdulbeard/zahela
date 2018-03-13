import { Injectable } from "@angular/core";
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import { Observable, Subject } from "rxjs";
import { Routes } from '../constants/Routes';
import { CurrentUser } from "../models/CurrentUser";
import { CookieUtils } from "../utils/CookieUtils";
import { UserPermission, UserRole } from "../constants/UserPermissions";
import { DisplayGuest } from "../models/DisplayGuest";

@Injectable()
export class AuthService implements CanActivate, CanLoad {
    loggedIn: boolean = false;
    currentUser: CurrentUser;
    constructor(private router: Router) {
        var userCookie = CookieUtils.getCookie("user");
        if (userCookie.indexOf("SuperUser") >= 0) {
            this.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), DisplayGuest.default(), true);
            this.logEventSubject.next(true);
            this.loggedIn = true;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isAllowedAccess(state.url)) {
            console.log("unauthorized");
            let navigationExtras: NavigationExtras = {
                queryParams: { 'cheater': "true", 'returnUrl': state.url },
                queryParamsHandling: 'merge',
            };
            // Navigate to the login page with extras
            this.router.navigate([Routes.login], navigationExtras);
            return false;
        }
        return true;
    }

    canLoad(route: Route): boolean {
        return this.isAllowedAccess(route.path);
    }

    public isAllowedAccess(url: string): boolean {
        var user = this.getCurrentUser();
        if (this.isInUrlList(url, user.permissions.forbiddenRoutes, true) ||
            (this.isInUrlList(url, user.permissions.postLoginRoutes, true)) && !user.loggedIn) {
            return false;
        }
        return true;
    }

    private getCurrentUser(): CurrentUser {
        return this.currentUser ? this.currentUser : CurrentUser.guest();
    }

    public getCurrentDisplayUser(): DisplayGuest {
        return this.getCurrentUser() ? this.getCurrentUser().guestInfo : DisplayGuest.default();
    }

    private isInUrlList(url: string, urlList: string[], addForwardSlash?: boolean) {
        for (var i = 0; i < urlList.length; i++) {
            var currentUrl = urlList[i];
            currentUrl = addForwardSlash ? `/${currentUrl}` : currentUrl;
            if (url.startsWith(currentUrl)) {
                return true;
            }
        }
    }

    private logEventSubject: Subject<boolean> = new Subject<boolean>();
    public logEvent: Observable<boolean> = this.logEventSubject.asObservable();

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public login(username: string, password: string): boolean {
        console.log(`${username}:${password}`);
        if (username === "AbdulTheBauss" && password === "YodaSaysIs") {
            console.log("setting cookiee");
            CookieUtils.setCookie("user", "SuperUser", 365, "");
            this.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), DisplayGuest.default(), true);
            this.logEventSubject.next(true);
            this.loggedIn = true;
            return true;
        }
        this.logEventSubject.next(false);
        return false;
    }

    public logout() {
        CookieUtils.deleteCookie("user");
        this.loggedIn = false;
        this.currentUser = null;
        this.router.navigate([Routes.home]);
        this.logEventSubject.next(false);
    }
}