import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { Router } from '@angular/router';
import { FriendsService } from '../../services/FriendsService';
import { Routes } from '../../constants/Routes';
import { User } from '../../models/CurrentUser';

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

  private friends: Array<User>;

  get cardSelected() {
    if (this.friendId) return true;
    return false;
  }

  isSelectedFriend(friend: User) {
    return this.friendId === friend.Username;
  }

  selectFriend(friend: User) {
    this.router.navigateByUrl(`${Routes.friends}\/${friend.Username}`);
  }

  private friendId: string;
  
}
