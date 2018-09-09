import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayFaq, FaqTitle, FaqContent } from '../../models/DisplayFaq';
import { FaqService } from '../../services/FaqService';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';
import { UserSessionService } from '../../services/UserSessionService';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService, FaqService]
})
export class FaqComponent implements OnInit {
  ngOnInit(): void {
    this.openFaqFromUrl();
  }
  constructor(private faqService: FaqService, private userService: UserService,
    private route: ActivatedRoute, private location: Location) {
    faqService.getFaqs().subscribe(faqs => {
      this.masterList = faqs;
      this.accordion = faqs.sort(DisplayFaq.sort).reverse();
      this.openFaqFromUrl();
    }, Error => {
      console.log(Error);
    })
    faqService.getFilters().subscribe(filters => {
      this.filters = filters;
    }, Error => {
      console.log(Error);
    });
    this.route.params.subscribe(param => {
      this.faqFromUrl = param["id"];
    }, (Error) => {
      console.log(Error);
    })
  }

  private masterList: DisplayFaq[];
  accordion: DisplayFaq[];
  filters: Array<string>;
  private faqFromUrl: string;
  question: string = "";

  openFaqFromUrl() {
    if (this.faqFromUrl && this.accordion) {
      this.accordion.map(faq => {
        faq.active = faq.id === this.faqFromUrl ? true : false;
      })
    }
  }

  search(searchString?: string, backspacePressed?: boolean) {
    searchString = searchString ? searchString : this.question;
    if (searchString) {
      var split = searchString.split(' ').map(entry => entry.trim().toLowerCase());
      if(backspacePressed){
        this.accordion = this.masterList;
      }
      this.accordion = this.accordion.filter(faq => {
        var tagsToSearch = faq.title.tags.map(x => x.toLowerCase()).concat(faq.content.tags.map(x => x.toLowerCase()));
        // console.log(tagsToSearch);
        // console.log(split);
        return split.some(x => tagsToSearch.includes(x) || tagsToSearch.some(y => y.startsWith(x)));
      })
      if(this.accordion.length == 0) this.accordion = this.masterList;
    }
    else {
      console.log('setting ot masterlist');
      this.accordion = this.masterList;
    }
  }

  doFilter(filter: string) {
    this.question = filter;
    this.search();
  }

  removeFilter(event: any) {
    event.stopPropagation();
    this.question = "";
    this.search();
  }

  private askQuestion() {
    var user = UserSessionService.getCurrentUser();
    this.faqService.askQuestion(user, this.question).subscribe(x => {
      console.log(x);
    });
  }

  private toggle(panel: DisplayFaq) {
    this.location.replaceState(`/${Routes.faq}/${panel.id}`);
    this.accordion.map((elem, index) => {
      if (elem !== panel) {
        elem.active = false;
      }
      else {
        if (elem.active) {
          elem.active = false;
        }
        else {
          elem.active = true;
        }
      }
    })
  }

  onKeyUp(event: any) {
    var that = this;
    this.delay(function () {
      var value = (<HTMLInputElement>document.getElementById("faq_question")).value;
      that.search(value, event.keyCode === 8);
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
