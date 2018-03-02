import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayGuest, Gender } from '../../models/DisplayGuest';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class FriendsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
  }

  friend: DisplayGuest = new DisplayGuest(
    "Abdul Beard",
    ["friends", "coworkers", "badass"],
    "My super duper bestest friend. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    "https://www.facebook.com/abdulkhaliqzaheer",
    "",
    "",
    "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
    "yolo@solo.com",
    ["coding", "philosophy", "IronMaiden"],
    "../../../assets/profile_pic_1.jpg",
    "../../../assets/profile_pic_2.jpg",
    Gender.Female
  );
  friend1: DisplayGuest = new DisplayGuest(
    "Abdul Beard",
    ["friends", "coworkers", "badass"],
    "My super duper bestest friend. Can't write much more bruh",
    "https://www.facebook.com/abdulkhaliqzaheer",
    "",
    "",
    "https://twosistersandamuslim.slack.com/messages/D2M36DM7T",
    "yolo@solo.com",
    ["coding", "philosophy", "IronMaiden"],
    "../../../assets/profile_pic_1.jpg",
    "../../../assets/profile_pic_2.jpg",
    Gender.Female
  );
  friends: DisplayGuest[] = [this.friend, this.friend1, this.friend1, this.friend, this.friend1, this.friend, this.friend1];
}
