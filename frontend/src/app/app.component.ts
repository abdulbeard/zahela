import { Component } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { RouterModule, ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { AuthService } from './services/AuthService';
import { Routes } from './constants/Routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Routes]
})
export class AppComponent implements AfterViewChecked {
  
  ngAfterViewChecked(): void {
    this.refreshNavigationLinks();
  }

  constructor(private authService: AuthService, private router: Router) {
    authService.logEvent.subscribe(logEvent => {
      this.refreshNavigationLinks();
    });
  }
  title = 'app';

  routeForLogin() {
    console.log(this.router.url);
    let navigationExtras: NavigationExtras = {
      queryParams: { 'returnUrl': this.router.url },
    };
    console.log("unauthorized");
    // Navigate to the login page with extras
    this.router.navigate([Routes.login], navigationExtras);
  }

  getHomeRoute(): string { return this.prependForwardSlash(Routes.home); }
  getAccountRoute(): string { return this.prependForwardSlash(Routes.account); }
  getMessagesRoute(): string { return this.prependForwardSlash(Routes.messages); }
  getFriendsRoute(): string { return this.prependForwardSlash(Routes.friends); }
  getPlaylistRoute(): string { return this.prependForwardSlash(Routes.playlist); }

  showHomeLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.home));
  showAccountLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.account));
  showMessagesLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.messages));
  showFriendsLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.friends));
  showPlaylistLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.playlist));

  refreshNavigationLinks() {
    console.log(this.authService.isAllowedAccess(Routes.friends));
    this.showHomeLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.home));
    this.showAccountLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.account));
    this.showMessagesLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.messages));
    this.showFriendsLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.friends));
    this.showPlaylistLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.playlist));
    }

  private prependForwardSlash(route: string): string {
    return `/${route}`;
  }
}