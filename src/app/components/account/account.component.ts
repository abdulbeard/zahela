import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayMenu } from '../../models/DisplayMenu';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class AccountComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
  }

  accountMenu: DisplayMenu[] = [
    new DisplayMenu("RSVP", true),
    new DisplayMenu("Updates", false),
    new DisplayMenu("Dietary Restrictions", false),
    new DisplayMenu("Polo", false),
    new DisplayMenu("Yolo", false),
    new DisplayMenu("Solo", false)
  ]

  private showUpdates: boolean = false;
  private showRsvp: boolean = true;
  private showDietaryRestrictions: boolean = false;
  private showPolo: boolean = false;
  private showSolo: boolean = false;
  private showYolo: boolean = false;

  accountMenuSelected(menu: DisplayMenu) {
    this.accountMenu.map(x => {      
        x.active = x.name === menu.name;
        if(x.active) {
          this.showMenuItem(x);
        }
    });
  }

  showMenuItem(displayMenu: DisplayMenu) {
    if (displayMenu.name == "RSVP") {
      //console.log("rsvp");
      this.showRsvp = true;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "Updates") {
      //console.log("updates");
      this.showRsvp = false;
      this.showUpdates = true;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "Dietary Restrictions") {
      //console.log("dietary restrictions");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = true;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "Polo") {
      //console.log("polo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = true;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "Solo") {
      //console.log("solo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = true;
    }
    else if (displayMenu.name == "Yolo") {
      //console.log("yolo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = true;
      this.showSolo = false;
    }
  }
}
