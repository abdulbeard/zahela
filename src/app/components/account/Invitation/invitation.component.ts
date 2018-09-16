import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { DisplayComment } from '../../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { DisplayChannel } from '../../../models/DisplayChannel';

@Component({
  selector: 'app-account-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class InvitationComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor() {
  }  
}
