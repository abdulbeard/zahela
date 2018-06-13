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
  selector: 'app-account-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class ProfileComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
  }

  channels: DisplayChannel[] = [
    new DisplayChannel("#random", "random", true),
    new DisplayChannel("#general", "general", false)
  ]

  channelSelected(channel: DisplayChannel) {
    var htmlElement = document.getElementById(channel.id);
    this.changeActiveItemOnMenu(htmlElement);
    this.showContent(channel);
  }

  private showContent(channel: DisplayChannel){
    var allChannelContents = $('.channelContent').toArray();
    allChannelContents.forEach(element => {
      if(element.id === channel.channelContentId()){
        $(element).show();
      }
      else{
        $(element).hide();
      }
    });
  }

  private changeActiveItemOnMenu(item: HTMLElement) {
    $(item)
      .addClass('active')
      .closest('.ui.menu')
      .find('.item')
      .not($(item))
      .removeClass('active')
      ;
  }
}
