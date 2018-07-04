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
import { ActivatedRoute, Router } from '@angular/router';
import { FriendsService } from '../../services/FriendsService';
import { Routes } from '../../constants/Routes';

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
  constructor(private friendsService: FriendsService, 
    private router: Router) {
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
    this.router.navigateByUrl(`${Routes.friends}\/${friend.name}`);
  }

  private friendId: string;
  
}
