import { Component, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { User } from '../../../models/CurrentUser';
import { UserSessionService } from '../../../services/UserSessionService';

@Component({
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class ProfileComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  private emailIsPublic: boolean = true;
  private twitterIsPublic: boolean = true;
  private facebookIsPublic: boolean = true;
  private instagramIsPublic: boolean = true;

  private contactInfos: Array<any> = []

  getSharedStatusText(entity: string, status: boolean) : string {
    return status ? `${entity} is visible to all guests` : `${entity} is only visible to the hosts.`;
  }

  private inEditMode: boolean = false;
  private user: User = UserSessionService.getCurrentUser();
  // new DisplayGuest("Abdul", ["self", "awesome"], "I like big butts and I cannot lie",
  // "www.facebook.com", "www.twitter.com", "www.instagram.com", "", "whatchulooking@for.com", 
  // ["spelunking", "calligraphy", "heavy metal", "spelunking", "calligraphy", "heavy metal", "spelunking", "calligraphy", "heavy metal"], 
  // "www.google.com", "www.google.com", Gender.Male);

  private enterEditMode() {
    this.inEditMode = true;
  }

  private save() {
    this.inEditMode = false;
  }

  private cancel() {
    this.inEditMode = false;
  }

  private addContactInfos() {
    this.contactInfos.push(
      new DisplayContactInfo(
        "Email", this.user.Email.Uri, this.user.Email.IsPublic, "Email Address", this.user.Email.Uri, "envelope"));
    this.contactInfos.push(
      new DisplayContactInfo(
        "Instagram", this.user.InstagramUrl.Uri, this.user.InstagramUrl.IsPublic, "Instagram User", this.user.InstagramUrl.Uri, "instagram"));
    this.contactInfos.push(
      new DisplayContactInfo(
        "Twitter", this.user.TwitterUrl.Uri, this.user.TwitterUrl.IsPublic, "Twitter User", this.user.TwitterUrl.Uri, "twitter"));
    this.contactInfos.push(
      new DisplayContactInfo(
        "Facebook", this.user.FacebookUrl.Uri, this.user.FacebookUrl.IsPublic, "Facebook User", this.user.FacebookUrl.Uri, "facebook"));
  }

  constructor() {
    this.addContactInfos();
  }
}

export class DisplayContactInfo {
  constructor(type: string, uri: string, isPublic: boolean, placeholder: string, model: string, icon: string) {
    this.Type = type;
    this.Uri = uri;
    this.IsPublic = isPublic;
    this.Model = model;
    this.Icon = icon;
  }

  Type: string; 
  Uri: string; 
  IsPublic: boolean;
  Placeholder: string;
  Model: string;
  Icon: string;
}
