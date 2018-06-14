import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayMenu } from '../../models/DisplayMenu';
import { DietaryRestrictionsDisplayGuest, Gender } from '../../models/DisplayGuest';
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
    NotificationsService.NotificationCount.subscribe(x => {
      this.notificationCount = x;
      var updatesAccountMenu = this.accountMenu[2];
      if (this.notificationCount > 0) {
        updatesAccountMenu.displayText = `(${this.notificationCount}) ${updatesAccountMenu.displayText}`;
        if (this.notificationCount > 4) {
          FaviconUtils.toNotificationsPending();
        }
      }
      else {
        FaviconUtils.toNormal();
      }
    });
  }

  private notificationCount: number;

  accountMenu: DisplayMenu[] = [
    new DisplayMenu(Routes.accountProfile, false, "Profile"),
    new DisplayMenu(Routes.accountRsvp, false, "RSVP"),
    new DisplayMenu(Routes.accountUpdates, false, "Updates"),
    new DisplayMenu(Routes.accountDietaryRestrictions, false, "Dietary Restrictions"),
    new DisplayMenu(Routes.accountPolo, false, "Polo"),
  ]
}
