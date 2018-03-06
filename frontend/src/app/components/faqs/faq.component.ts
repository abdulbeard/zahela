import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayFaq, FaqTitle, FaqContent } from '../../models/DisplayFaq';
import { FaqService } from '../../services/FaqService';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService, FaqService]
})
export class FaqComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private faqService: FaqService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
    faqService.getFaqs().subscribe(faqs => {
      this.accordion = faqs.sort(DisplayFaq.sort).reverse();
    }, Error => {
      console.log(Error);
    })
    faqService.getFilters().subscribe(filters => {
      this.filters = filters;
    }, Error => {
      console.log(Error);
    });
  }

  private accordion: DisplayFaq[];
  private filters: Array<string>;
  question: string = "5456465";

  onKeyUp() {
    this.delay(function () {
      var value = document.getElementById("faq_question");
      console.log(value);
      alert('Time elapsed!' + this.question);
    }, 1000);
  }

  delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
}
