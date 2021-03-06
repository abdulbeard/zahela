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
import { UserSessionService } from '../../services/UserSessionService';
import { UserType, User } from '../../models/CurrentUser';
import { TokenUtils } from '../../utils/TokenUtils';
import { Routes } from '../../constants/Routes';

@Component({
  selector: 'app-login',
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
  constructor(private router: Router, route: ActivatedRoute, private authService: AuthService, private userService: UserService) {
    this.returnUrl = route.snapshot.queryParams['returnUrl'] || '/';
    this.comingFromSlack = route.snapshot.queryParams['comingFromSlack'];
    this.slackCode = route.snapshot.queryParams['code'];
    this.slackState = route.snapshot.queryParams['state'];
    if (this.slackState) {
      this.returnUrl = this.slackState;
    }
    console.log(this.returnUrl);
    UserSessionService.userObservable.subscribe(x => {
      if(x && x.Type === UserType.RegisteredUser){
        router.navigate([this.returnUrl]);
      }
    });
    // console.log(this.comingFromSlack);
    // console.log(this.slackCode);
    // console.log(this.slackState);
    if (this.comingFromSlack){
      this.login();
    }
  }

  loginError: string;
  signupErrors: string[];

  username: string;
  password: string;

  returnUrl: string;
  comingFromSlack: boolean = false;
  slackCode: string;
  slackState: string;

  requestConnectionName: string = "";
  requestConnectionEmail: string = "";
  requestConnectionHistory: string = "";

  doingRegisterFlow: boolean = false;
  registerFlowUserFound: boolean = false;
  registerFlowUserNotFound: boolean = false;
  registerEmailAddress: string = '';
  registerPassword: string = '';
  tryingToFindUser: boolean = false;

  connectionRequested: boolean = true;

  private user: User = null;
  userToken: string = '';

  get showStartRegisterButton(): boolean {
    return !this.doingRegisterFlow;
  }

  get showFindMeButton(): boolean {
    return this.doingRegisterFlow;
  }

  login() {
    this.dismissLoginError();
    // this.authService.loginWithSlack(this.slackCode).subscribe(response => {
    //   console.log(this.returnUrl);
    //   console.log(response);
    //   this.authService.loginEvent(true);
    //   this.router.navigateByUrl(this.returnUrl);
    // }, error => {
    //   this.loginError = "You done goofed";
    //   this.authService.loginEvent(false);
    // });

    // if (this.authService.loginWithSlack(this.slackCode)) {
    //   console.log(this.returnUrl);
    //   this.router.navigateByUrl(this.returnUrl);
    // }
    // else {
    //   this.loginError = "You done goofed";
    // }

    this.authService.logEvent.subscribe(x => {
      console.log(x);
      if(x) {
        console.log(`about to navigate to ${this.returnUrl}`);
        this.router.navigateByUrl(this.returnUrl);
      }
      else {
        this.loginError = "Your username or password is incorrect.";
        //this.router.navigateByUrl(this.returnUrl);
      }
    });
    this.authService.login(this.username, this.password);

    // if (this.authService.login(this.username, this.password)) {
    //   console.log(this.returnUrl);
    //   this.router.navigateByUrl(this.returnUrl);
    // }
    // else {
    //   this.loginError = "You done wrong";
    // }
  }

  registerUser() {
    if(this.userToken){
      TokenUtils.setToken(this.userToken);
    }
    
    var userId = JSON.parse(JSON.stringify(this.user)).id;    
    this.userService.registerUser(userId, this.registerPassword).subscribe(x => {
      if(this.returnUrl){
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.router.navigate([Routes.account, Routes.accountRsvp]);
      }
    });
  }

  startRegisterFlow() {
    this.doingRegisterFlow = true;
  }

  findUserByEmail() {
    this.tryingToFindUser = true;
    this.userService.getUserByUsername(this.registerEmailAddress).subscribe(x => {
      this.userToken = x.headers.get('access-token');
      this.user = x.body;
      this.tryingToFindUser = false;
      this.registerFlowUserFound = true;
      this.registerFlowUserNotFound = false;
      console.log(this.user);
    }, error => {
      this.tryingToFindUser = false;
      this.registerFlowUserFound = false;
      this.registerFlowUserNotFound = true;
    });
    setTimeout(() => {}, 1000);
  }

  requestConnection() {
    console.log(this.requestConnectionName, this.requestConnectionHistory, this.requestConnectionEmail);
    this.connectionRequested = true;
    //this.signupErrors = ["Bad name", "Bad email", "Bad History"];
  }

  dismissLoginError() {
    this.loginError = null;
  }

  dismissSignupErrors() {
    this.signupErrors = null;
  }

  getSlackButtonHref(){
    let slackBaseUrl = "https://slack.com/oauth/authorize?scope=identity.basic,identity.email";
    let slackState = this.returnUrl;
    let clientId = "352254812548.353380346342";
    return `${slackBaseUrl}&state=${slackState}&client_id=${clientId}`;
  }

  onKeyUp(event: any) {
    console.log(event);
    var that = this;
    this.delay(function () {
      // var value = (<HTMLInputElement>document.getElementById("faq_question")).value;
      var value = that.username;
      that.userService.getUserByUsername(value).subscribe(x => {
        console.log(x);
      });
    }, 300);
  }

  delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

}
