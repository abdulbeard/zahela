import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';

@Component({
  selector: 'app-slack-feed',
  templateUrl: './slack-feed.component.html',
  styleUrls: ['./slack-feed.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
              SlackMessageParsingService, SlackReactionsService]
})
export class SlackFeedComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
    this.slackMessagesService.getMessages().subscribe((result) => {
      console.log(result);
      this.comments = this.slackMessageParsingService.parseSlackMessages(result);
    }, (Error) => {
      console.log(Error);
    })
  }
  title = 'app';
  messages: MessagesResponse;

  emoji = EmojiService.getEmojiImageUrl(this.emojiDefinitions[":smile:"]);
  emojiImg = "<img src='https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/bowtie.png' />"

  comments: Array<DisplayComment> = [];

  openInNewTab(url: string){
    window.open(url)
  }
}
