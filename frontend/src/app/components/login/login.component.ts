import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
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
export class LoginComponent implements AfterViewInit, AfterViewChecked {

  ngAfterViewChecked(): void {
    if (this.loginError) {
      document.getElementById('loginError').scrollIntoView(false);
    }
    else if (this.signupErrors) {
      document.getElementById('signupErrors').scrollIntoView(false);
    }
  }

  ngAfterViewInit(): void {
  }
  constructor(private router: Router, route: ActivatedRoute, private authService: AuthService) {
    this.returnUrl = route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginError: string;
  signupErrors: string[];

  returnUrl: string;

  username: string = "";
  password: string = "";

  requestConnectionName: string = "";
  requestConnectionEmail: string = "";
  requestConnectionHistory: string = "";

  login() {
    this.dismissLoginError();
    if (this.authService.login(this.username, this.password)) {
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    }
    else {
      this.loginError = "You done wrong";
    }
  }

  requestConnection() {
    console.log(this.requestConnectionName, this.requestConnectionHistory, this.requestConnectionEmail);
    this.signupErrors = ["Bad name", "Bad email", "Bad History"];
  }

  dismissLoginError() {
    this.loginError = null;
  }

  dismissSignupErrors() {
    this.signupErrors = null;
  }
}
