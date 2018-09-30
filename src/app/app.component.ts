import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentChecked } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { RouterModule, ActivatedRoute, NavigationExtras, Router, RouterState } from '@angular/router'
import { AuthService } from './services/AuthService';
import { Routes } from './constants/Routes';
import { MobileUtils } from './utils/MobileUtils';
import { NotificationsService } from './services/NotificationsService';
import { Title } from '@angular/platform-browser';
import { VersionService } from './services/VersionService';
import { TokenUtils } from './utils/TokenUtils';
import { ModalService } from './services/ModalService';
import { ModalComponent } from './components/modals/recipe/modal.component';
import { User } from './models/CurrentUser';
import { UserSessionService } from './services/UserSessionService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Routes]
})
export class AppComponent implements AfterViewChecked, AfterContentChecked {
  ngAfterContentChecked(): void {
    UserSessionService.detectCurrentUser();
    this.refreshNavigationLinks();
  }

  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent: ViewContainerRef;
  
  ngAfterViewChecked(): void {
    UserSessionService.detectCurrentUser();
    this.refreshNavigationLinks();
  }

  constructor(public authService: AuthService, private router: Router,
    private notificationsService: NotificationsService,
    private titleService: Title,
    private versionService: VersionService,
    private componentFactoryResolver: ComponentFactoryResolver,) {    
    UserSessionService.detectCurrentUser();
    this.authService = authService;
    this.authService.logEvent.subscribe(logEvent => {
      UserSessionService.detectCurrentUser();
      this.refreshNavigationLinks();
    });
    NotificationsService.NotificationCount.subscribe(x => {
      //this.titleService.setTitle(`(${x}) ${this.titleService.getTitle()}`);
    });
    this.setMobileView(window);
    window.onresize = () => this.setMobileView(window);
    window.onload = () => this.getNotificationCount();
    window.onfocus = () => this.checkForUpdates();

    ModalService.modalObservable.subscribe(x => {
      if (x.visible) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        this.modalContent.clear();
        let componentRef = this.modalContent.createComponent(componentFactory);
        componentRef.instance['data'] = x.data;
        componentRef.instance['onDismiss'] = x.onDismiss;
        this.showModal = true;
      }
      else {
        this.modalContent.clear();
        this.showModal = false;
       }
    });
  }
  title = 'app';
  showSideBar = false;
  screenWidth: number = 1000;
  isMobileView: boolean = false;
  showModal: boolean = false;

  setMobileView(window: Window) {
    this.screenWidth = window.innerWidth;
    this.isMobileView = this.screenWidth < 500;
    MobileUtils.updateIsMobileView(this.isMobileView);
    console.log(`sw=${this.screenWidth}&ismobile=${this.isMobileView}`);
  }

  getNotificationCount() {
    this.notificationsService.getNotificationCountForUser().subscribe(x => {
      var count = x.body;
      TokenUtils.setToken(x.headers.get('access-token'));
      NotificationsService.updateNotificationCount(count);
    });
  }

  checkForUpdates() {
    this.versionService.checkForVersionChange().subscribe(x => {
      if (x === true) {
        window.location.reload(true);
      }
      else { console.log('no changes detected') }
    }, error => console.log(error));
  }

  routeForLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'returnUrl': this.router.url },
    };
    console.log("unauthorized");
    // Navigate to the login page with extras
    this.router.navigate([Routes.login], navigationExtras);
  }

  getDisplayGuest(): User {
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

  get sidebarVisibility(): boolean {
    return this.sidebarIsVisible;
  }

  sidebarIsVisible: boolean = false;

  hideSidebar() {
    this.sidebarIsVisible = false;
    return true;
  }

  showSidebar() {
    console.log("tryna show sidebar");
    this.sidebarIsVisible = true;
    return true;
  }

  showHeaderNavigationBar() {
    var routesToHideFor = [`/${Routes.comingSoon}`, `/${Routes.home}`]
    if (routesToHideFor.includes(this.router.url)){
      return false;
    }
    return true;
  }
}