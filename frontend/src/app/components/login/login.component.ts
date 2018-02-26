import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { AuthService } from '../../services/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class LoginComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private router: Router, route: ActivatedRoute, private authService: AuthService) {
    this.returnUrl = route.snapshot.queryParams['returnUrl'] || '/';
  }

  returnUrl: string;

  username: string = "";
  password: string = "";

  login() {
    if (this.authService.login(this.username, this.password)) {
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}
