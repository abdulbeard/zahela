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
    new DisplayMenu("Solo", false),
    new DisplayMenu("Yolo", false),
  ]

  accountMenuSelected(menu: DisplayMenu) {
    this.accountMenu.map(x => {
      x.active = x.name === menu.name;
    });
  }
}
