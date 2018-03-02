import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class PlaylistComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
  }
  videos = [{
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  },
  {
    name: "yolo",
    url: "https://www.youtube.com/embed/MqoANESQ4cQ",
    description: "My favorite song",
    category: "Oompa Loompa"
  }];
}
