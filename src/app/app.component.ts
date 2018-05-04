import { Component } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { RouterModule, ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { AuthService } from './services/AuthService';
import { Routes } from './constants/Routes';
import { DisplayGuest } from './models/DisplayGuest';

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

  constructor(public authService: AuthService, private router: Router) {
    this.authService = authService;
    this.authService.logEvent.subscribe(logEvent => {
      this.refreshNavigationLinks();
    });
  }
  title = 'app';
  showSideBar = false;

  routeForLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'returnUrl': this.router.url },
    };
    console.log("unauthorized");
    // Navigate to the login page with extras
    this.router.navigate([Routes.login], navigationExtras);
  }

  getDisplayGuest(): DisplayGuest {
    return this.authService.getCurrentDisplayUser();
  }

  getHomeRoute(): string { return this.prependForwardSlash(Routes.home); }
  getAccountRoute(): string { return this.prependForwardSlash(Routes.account); }
  getMessagesRoute(): string { return this.prependForwardSlash(Routes.messages); }
  getFriendsRoute(): string { return this.prependForwardSlash(Routes.friends); }
  getPlaylistRoute(): string { return this.prependForwardSlash(Routes.playlist); }
  getFaqRoute(): string { return this.prependForwardSlash(Routes.faq); }
  getRecipeRoute(): string { return this.prependForwardSlash(Routes.recipe); }

  showHomeLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.home));
  showAccountLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.account));
  showMessagesLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.messages));
  showFriendsLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.friends));
  showPlaylistLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.playlist));
  showFaqLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.faq));
  showRecipeLink: boolean = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.recipe));

  refreshNavigationLinks() {
    this.showHomeLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.home));
    this.showAccountLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.account));
    this.showMessagesLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.messages));
    this.showFriendsLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.friends));
    this.showPlaylistLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.playlist));
    this.showRecipeLink = this.authService.isAllowedAccess(this.prependForwardSlash(Routes.recipe));
  }

  private prependForwardSlash(route: string): string {
    return `/${route}`;
  }

  get sidebarVisibility() : boolean {
    return this.sidebarIsVisible;
  }
  
  sidebarIsVisible: boolean = false;

  hideSidebar(){
    this.sidebarIsVisible = false;
    return true;
  }

  showSidebar(){
    console.log("tryna show sidebar");
    this.sidebarIsVisible = true;
    return true;
  }

}