import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { DisplayComment } from '../../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { DisplayChannel } from '../../../models/DisplayChannel';
import { DisplayGuest, Gender } from '../../../models/DisplayGuest';

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
    console.log(this.contactInfos);
    return status ? `${entity} is visible to all guests` : `${entity} is only visible to the hosts.`;
  }

  private inEditMode: boolean = false;
  private user: DisplayGuest = new DisplayGuest("Abdul", ["self", "awesome"], "I like big butts and I cannot lie",
  "www.facebook.com", "www.twitter.com", "www.instagram.com", "", "whatchulooking@for.com", 
  ["spelunking", "calligraphy", "heavy metal", "spelunking", "calligraphy", "heavy metal", "spelunking", "calligraphy", "heavy metal"], 
  "www.google.com", "www.google.com", Gender.Male);

  private enterEditMode() {
    this.inEditMode = true;
  }

  private save() {
    this.inEditMode = false;
  }

  private cancel() {
    this.inEditMode = false;
  }

  constructor() {
    this.contactInfos.push({
      Type: "Email", 
      Uri: this.user.email, 
      IsPublic: this.emailIsPublic, 
      Placeholder: "Email Address",
      Model: this.user.email,
      Icon: "envelope"
    });
    this.contactInfos.push({
      Type: "Instagram", 
      Uri: this.user.instagramUrl, 
      IsPublic: this.instagramIsPublic, 
      Placeholder: "Instagram User",
      Model: this.user.instagramUrl,
      Icon: "instagram"
    });
    this.contactInfos.push({
      Type: "Twitter", 
      Uri: this.user.twitterUrl, 
      IsPublic: this.twitterIsPublic, 
      Placeholder: "Twitter User",
      Model: this.user.twitterUrl,
      Icon: "twitter"
    });
    this.contactInfos.push({
      Type: "Facebook", 
      Uri: this.user.facebookUrl, 
      IsPublic: this.facebookIsPublic, 
      Placeholder: "Facebook User",
      Model: this.user.facebookUrl,
      Icon: "facebook"
    });
  }
}
