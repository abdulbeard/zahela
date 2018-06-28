import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayGuest, Gender } from '../../models/DisplayGuest';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from '../../services/FriendsService';

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
  constructor(private route: ActivatedRoute, private c: ChangeDetectorRef,
    private friendsService: FriendsService) {
    this.route.params.subscribe(param => {
      this.friendId = param["id"];
      console.log(this.friendId);
    }, (Error) => {
      console.log(Error);
    });
    this.friendsService.getFriendsForUser().subscribe(x => {
      this.friends = x;
    });
  }

  private friends: Array<DisplayGuest>;

  get cardSelected() {
    if (this.friendId) return true;
    return false;
  }

  isSelectedFriend(friend: DisplayGuest) {
    return this.friendId === friend.name;
  }

  selectFriend(friend: DisplayGuest) {
    this.c.detectChanges();
  }

  private friendId: string;

  
  
}
