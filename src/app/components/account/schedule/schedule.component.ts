import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
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

  fridayEvening: boolean = false;
  saturdayDaytime: boolean = false;
  saturdayEvening: boolean = false;
  sundayDaytime: boolean = false;
  freeForm: string = '';

  save() {
    this.submitting = true;
    // setTimeout(() => {

    // }, 2000);
    // console.log(this.whenYoullArrive);
    // console.log(this.flyingIn);
    // console.log(this.whenYoullDepart);
    this.feedbackService.submitFeedback([
      new Feedback("I'll be there Friday evening", this.fridayEvening ? 'Yes' : 'No' ),
      new Feedback("I'll be there Saturday daytime", this.saturdayDaytime ? 'Yes' : 'No' ),
      new Feedback("I'll be there Saturday evening", this.saturdayEvening ? 'Yes' : 'No' ),
      new Feedback("I'll be there Sunday daytime", this.sundayDaytime ? 'Yes' : 'No' ),
      new Feedback("Freeform arrival feedback", this.freeForm),
    ]).subscribe(x => {
      this.submitting = false;
      this.doneSubmitting = true;
    });
  }
}
