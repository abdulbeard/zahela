import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { DisplayComment } from '../../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { DisplayChannel } from '../../../models/DisplayChannel';
import { FeedbackService, Feedback } from '../../../services/FeedbackService';

@Component({
  selector: 'app-account-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class ScheduleComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private feedbackService: FeedbackService) {
  }  
  whenYoullArrive: string = '';
  flyingIn: string = '';
  whenYoullDepart: string = '';
  submitting: boolean = false;
  doneSubmitting: boolean = false;

  save() {
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.doneSubmitting = true;
    }, 2000);
    console.log(this.whenYoullArrive);
    console.log(this.flyingIn);
    console.log(this.whenYoullDepart);
    this.feedbackService.submitFeedback([
      new Feedback('What day do you expect to arrive?', this.whenYoullArrive),
      new Feedback('Flying to Chattanooga or Atlanta? Need a ride?', this.flyingIn),
      new Feedback('When will you depart?', this.whenYoullArrive)
    ]).subscribe();
  }
}
