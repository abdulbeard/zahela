import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DisplayMenu } from '../../models/DisplayMenu';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Routes } from '../../constants/Routes';
import { AvatarService } from '../../services/AvatarService';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper'
import { NotificationsService } from '../../services/NotificationsService';
import { FaviconUtils } from '../../utils/FaviconUtils';

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
    private notificationsService: NotificationsService) {
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
  }

  private notificationCount: number;

  private updateNotificationCount(): void {
    var updatesAccountMenu = this.accountMenu[2];
    if (this.notificationCount > 0) {
      updatesAccountMenu.displayText = `(${this.notificationCount}) ${updatesAccountMenu.displayText}`;
    }
  }

  accountMenu: DisplayMenu[] = [
    new DisplayMenu(Routes.accountProfile, false, "Profile"),
    new DisplayMenu(Routes.accountRsvp, false, "RSVP"),
    new DisplayMenu(Routes.accountUpdates, false, "Updates"),
    new DisplayMenu(Routes.accountDietaryRestrictions, false, "Dietary Restrictions"),
    new DisplayMenu(Routes.accountPolo, false, "Polo"),
  ]
}
