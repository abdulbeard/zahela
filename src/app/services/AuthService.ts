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
import { CurrentUser, User } from "../models/CurrentUser";
import { CookieUtils } from "../utils/CookieUtils";
import { UserPermission, UserRole } from "../constants/UserPermissions";
import { SlackAuthService, SlackOAuthAccessResponse } from "./SlackAuthService";

@Injectable()
export class AuthService implements CanActivate, CanLoad {
    loggedIn: boolean = false;
    private static currentUser: CurrentUser;
    constructor(private router: Router, private slackAuthService: SlackAuthService) {
        var userCookie = CookieUtils.getCookie("user");
        console.log(userCookie);
        if (userCookie.indexOf("SuperUser") >= 0) {
            AuthService.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), User.default(), true);
            this.logEventSubject.next(true);
            this.loggedIn = true;
        }
    }

    public static setCurrentUserGuestInfo(user: User) {
        if (AuthService.currentUser) { 
            AuthService.currentUser.guestInfo = user; 
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
        return AuthService.currentUser ? AuthService.currentUser : CurrentUser.guest();
    }

    public getCurrentDisplayUser(): User {
        var currentDisplayUser = this.getCurrentUser();
        return currentDisplayUser ? currentDisplayUser.guestInfo : User.default();
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
            return this.loginEvent(true);
        }
        return this.loginEvent(false);
    }

    public loginEvent(successful: boolean) {
        if (successful) {
            console.log("setting cookiee");
            CookieUtils.setCookie("user", "SuperUser", 365, "");
            AuthService.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), User.default(), true);
            this.logEventSubject.next(true);
            this.loggedIn = true;
            return true;
        }
        else {
            this.logEventSubject.next(false);
            return false;
        }
    }

    public loginWithSlack(code: string) : Observable<SlackOAuthAccessResponse> {
        console.log(`login with slack code: ${code}`);
        return this.slackAuthService.getUserToken(code);
    }

    public logout() {
        CookieUtils.deleteCookie("user");
        this.loggedIn = false;
        AuthService.currentUser = null;
        this.router.navigate([Routes.home]);
        this.logEventSubject.next(false);
    }
}