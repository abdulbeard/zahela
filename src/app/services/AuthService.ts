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
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { TokenUtils } from "../utils/TokenUtils";
import { UserSessionService } from "./UserSessionService";

@Injectable()
export class AuthService implements CanActivate, CanLoad {
    private static currentUser: CurrentUser;
    constructor(private router: Router, private slackAuthService: SlackAuthService, private httpClient: HttpClient) {
        // var userCookie = CookieUtils.getCookie("user");
        // console.log(userCookie);
        // if (userCookie.indexOf("SuperUser") >= 0) {
        //     AuthService.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), User.default(), true);
        //     this.logEventSubject.next(true);
        // }
    }

    // public static setCurrentUserGuestInfo(user: User) {
    //     if (AuthService.currentUser) { 
    //         AuthService.currentUser.guestInfo = user; 
    //     }
    // }

    alreadyNavigatedToOriginalUrl: boolean = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isAllowedAccess(state.url)) {
            console.log("unauthorized");
            let navigationExtras: NavigationExtras = {
                queryParams: { 'unauthorized': "true", 'returnUrl': state.url },
                queryParamsHandling: 'merge',
            };
            // Navigate to the login page with extras
            setTimeout(() => {
                if(!UserSessionService.userIsLoggedIn()) {
                    console.log('running now');
                    this.router.navigate([Routes.login], navigationExtras);
                }
                else {
                    if(this.alreadyNavigatedToOriginalUrl){
                        this.router.navigate([Routes.account, Routes.accountRsvp]);
                    }
                    else {
                        this.alreadyNavigatedToOriginalUrl = true;
                        this.router.navigate([state.url]);
                    }
                }
            }, 100);
            // this.router.navigate([Routes.login], navigationExtras);
            return false;
        }
        return true;
    }

    canLoad(route: Route): boolean {
        return this.isAllowedAccess(route.path);
    }

    public isAllowedAccess(url: string): boolean {
        var user = this.getCurrentUser();
        // if (this.isInUrlList(url, user.permissions.forbiddenRoutes, true) ||
        //     // (this.isInUrlList(url, user.permissions.postLoginRoutes, true)) && !user.loggedIn) {
        //     (this.isInUrlList(url, user.permissions.postLoginRoutes, true)) && !this.loggedIn) {                
        //     return false;
        // }
        var userIsLoggedIn = UserSessionService.userIsLoggedIn();
        if (this.isInUrlList(url, user.permissions.forbiddenRoutes, true) ||
            (this.isInUrlList(url, user.permissions.postLoginRoutes, true) && !userIsLoggedIn)) {
            return false;
        }
        return true;
    }

    private getCurrentUser(): CurrentUser {
        // return AuthService.currentUser ? AuthService.currentUser : CurrentUser.guest();
        return UserSessionService.getCurrentUserAndPermissions();
    }

    public getCurrentDisplayUser(): User {
        return UserSessionService.getCurrentUser();
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
        return UserSessionService.userIsLoggedIn();
    }

    public login(username: string, password: string){
        // console.log(`${username}:${password}`);
        // if (username === "AbdulTheBauss" && password === "YodaSaysIs") {
        //     return this.loginEvent(true);
        // }
        // return this.loginEvent(false);
        this.httpClient.post<Object>(`${environment.backendUrl}/user/login`, {
            Username: username,
            Password: password
        }, { observe: 'response' }).subscribe(x => {
            console.log(x);
            TokenUtils.setToken(x.headers.get('access-token'));
            this.loginEvent(true);
        }, error => {
            console.log(error);
            this.loginEvent(false);
        });
    }

    public loginEvent(successful: boolean) {
        if (successful) {
            console.log("setting cookiee");
            CookieUtils.setCookie("user", "SuperUser", 365, "");
            AuthService.currentUser = new CurrentUser(new UserPermission(UserRole.Admin, [], []), User.default(), true);
            this.logEventSubject.next(true);
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
        AuthService.currentUser = null;
        UserSessionService.logout();
        this.logEventSubject.next(false);
        this.router.navigate([Routes.home]);        
    }
}