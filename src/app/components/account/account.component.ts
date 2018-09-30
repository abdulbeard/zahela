import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DisplayMenu } from '../../models/DisplayMenu';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Routes } from '../../constants/Routes';
import { AvatarService } from '../../services/AvatarService';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper'
import { NotificationsService } from '../../services/NotificationsService';
import { FaviconUtils } from '../../utils/FaviconUtils';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: []
})
export class AccountComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private location: Location, private route: ActivatedRoute,
    private avatarService: AvatarService,
    private notificationsService: NotificationsService, private authService: AuthService) {
    this.notificationCount = NotificationsService.getCurrentNotificationCount();
    this.updateNotificationCount();
    NotificationsService.NotificationCount.subscribe(x => {
      this.notificationCount = x;
      this.updateNotificationCount();
      if (this.notificationCount > 4) {
        FaviconUtils.toNotificationsPending();
      }
      else {
        FaviconUtils.toNormal();
      }
    });
    this.setupAccountMenu();
  }

  private notificationCount: number;

  private updateNotificationCount(): void {
    var updatesMenuItems = this.accountMenu.filter(x => {
      return x.name === Routes.accountUpdates;
    });
    var updatesAccountMenu = updatesMenuItems ? updatesMenuItems[0] : null;
    if (this.notificationCount > 0 && updatesAccountMenu) {
      // updatesAccountMenu.displayText = `(${this.notificationCount}) ${updatesAccountMenu.displayText}`;
      updatesAccountMenu.displayText = `${updatesAccountMenu.displayText}`;
    }
  }

  accountMenu: DisplayMenu[] = []

  setupAccountMenu() {
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountProfile}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountProfile, false, "Profile"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountRsvp}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountRsvp, false, "RSVP"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountUpdates}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountUpdates, false, "Updates"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountDietaryRestrictions}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountDietaryRestrictions, false, "Dietary Restrictions"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountPolo}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountPolo, false, "Polo"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountInvitation}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountInvitation, false, "Invitation"));
    };
    if(this.authService.isAllowedAccess(`/${Routes.account}/${Routes.accountSchedule}`)){
      this.accountMenu.push(new DisplayMenu(Routes.accountSchedule, false, "Arrival"));
    };
  }
}
