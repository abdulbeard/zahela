import { Component } from '@angular/core';
import { EmojiDefinitions, EmojiService } from './services/EmojiService'
import { SlackMessagesService, MessagesResponse } from './services/SlackMessagesService';
import { DisplayComment, User } from './models/DisplayComment';
import { UserService } from './services/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService]
})
export class AppComponent {
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService) {
    this.slackMessagesService.getMessages().subscribe((result) => {
      console.log(result);
      this.parseSlackMessages(result);
    }, (Error) => {
      console.log(Error);
    })
  }
  title = 'app';
  messages: MessagesResponse;

  emoji = EmojiService.getEmojiImageUrl(this.emojiDefinitions[":smile:"]);
  emojiImg = "<img src='https://www.webpagefx.com/tools/emoji-cheat-sheet/graphics/emojis/bowtie.png' />"

  comments: Array<DisplayComment> = [{
    user: {
      img: "https://semantic-ui.com/images/avatar/small/elliot.jpg",
      name: "Elliott"
    },
    text: "Yo this is fantastic",
    textIsHtml: false,
    threadComments: [{
      user: {
        img: "https://semantic-ui.com/images/avatar/small/matt.jpg",
        name: "Matt",
      },
      text: "Matt says this is awesome",
      textIsHtml: false,
      threadComments: null,
      timestamp: new Date(),
    },
    {
      user: {
        img: "https://semantic-ui.com/images/avatar/small/jenny.jpg",
        name: "Jenny",
      },
      text: "Jenny says this is awesome",
      textIsHtml: false,
      threadComments: null,
      timestamp: new Date(),
    }],
    timestamp: new Date()
  }];

  parseSlackMessages(slackMessages: MessagesResponse) {
    for (var i = 0; i < slackMessages.messages.length; i++) {
      var displayComment = new DisplayComment();
      var slackMessage = slackMessages.messages[i];
      displayComment.text = slackMessage.text;
      displayComment.timestamp = new Date(parseFloat(slackMessage.ts) * 1000.0);
      displayComment.user = this.userService.getUserInfo(slackMessage.user);
      displayComment.threadComments = new Array<DisplayComment>();
      if (EmojiService.textContainsEmoji(displayComment.text)) {
        displayComment.text = EmojiService.replaceEmojisWithHtml(displayComment.text);
        displayComment.textIsHtml = true;
      }
      if (slackMessage.thread_ts) {
        this.slackMessagesService.getThreadMessages(slackMessage.thread_ts).subscribe((result) => {
          console.log(result);
          result.messages.forEach(message => {
            if (message.thread_ts !== slackMessage.thread_ts) {
              var textContainsEmoji = EmojiService.textContainsEmoji(message.text);
              displayComment.threadComments.push({
                text: textContainsEmoji ? EmojiService.replaceEmojisWithHtml(message.text) : message.text,
                threadComments: [],
                timestamp: new Date(parseFloat(message.ts) * 1000.0),
                user: this.userService.getUserInfo(message.user),
                textIsHtml: textContainsEmoji
              });
            }
          })
        }, (Error) => {
          console.log(Error);
        });
      }
      this.comments.push(displayComment);
    }
  }
}
