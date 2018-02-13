import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { convertToParamMap } from '@angular/router/src/shared';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class MessagesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (this.channelFromUrl) {
      this.channelSelected(this.channelFromUrl);
    }
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService,
    private route: ActivatedRoute, private router: Router, private location: Location) {
    console.log(this.route.params);
    this.route.params.subscribe(param => {
      var channel = param["channel"];
      console.log(channel);
      this.channelFromUrl = this.lookupChannel(channel);
      console.log('param retrieved successfully');
      console.log(this.channelFromUrl);
    }, (Error) => {
      console.log(Error);
    })
  }

  channels: DisplayChannel[] = [
    new DisplayChannel("C2M99LPK4", "primingham_manor", true),
    new DisplayChannel("general", "general", false)
  ]

  private lookupChannel(channelId: string): DisplayChannel {
    for (var i = 0; i < this.channels.length; i++) {
      var channel = this.channels[i];
      if (channel.id === channelId) {
        return channel;
      }
    }
    return null;
  }

  channelFromUrl: DisplayChannel;

  channelSelected(channel: DisplayChannel) {
    //this.router.navigate([`/${channel.id}`], { skipLocationChange: true, relativeTo: this.route });
    var htmlElement = document.getElementById(channel.id);
    this.changeActiveItemOnMenu(htmlElement);
    this.showContent(channel);
    console.log(location);
    this.location.replaceState(`/messages/${channel.id}`);
    //location.replace("/messages/C2M99LPK4");
  }

  onChannelSelected(channel: DisplayChannel) {
  }

  private showContent(channel: DisplayChannel) {
    var allChannelContents = $('.channelContent').toArray();
    allChannelContents.forEach(element => {
      if (element.id === channel.channelContentId()) {
        $(element).show();
      }
      else {
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
