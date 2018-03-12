import { Component, OnInit, AfterViewInit, OnChanges, Input } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { } from 'semantic-ui-visibility';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-slack-feed',
  templateUrl: './slack-feed.component.html',
  styleUrls: ['./slack-feed.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class SlackFeedComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
      this.navigateToBottom();
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {

  }

  @Input()
  set channel(channel: string) {
    this.channelName = channel;
    console.log(`channelName1: ${this.channelName}`);
    this.slackMessagesService.getMessages(this.channelName).subscribe((result) => {
      console.log(result);
      this.comments = this.slackMessageParsingService.parseSlackMessages(this.channelName, result);
    }, (Error) => {
      console.log(Error);
    })
  }

  private channelName: string;
  title = 'app';
  messages: MessagesResponse;

  emoji = EmojiService.getEmojiImageUrl(this.emojiDefinitions[":smile:"]);
  emojiImg = "<img src='https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/bowtie.png' />"

  comments: Array<DisplayComment> = [];

  openInNewTab(url: string) {
    window.open(url)
  }

  navigateToBottom() {
    document.getElementById('latest').scrollIntoView();
  }
}
