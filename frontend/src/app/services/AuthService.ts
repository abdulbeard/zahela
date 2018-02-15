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
}