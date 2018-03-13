import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService, FaqService]
})
export class FaqComponent implements OnInit {
  ngOnInit(): void {
    if (this.faqFromUrl) {
      this.accordion.map(faq => {
        faq.active = faq.id === this.faqFromUrl ? true : false;
      })
    }
  }
  constructor(private faqService: FaqService, private userService: UserService,
    private route: ActivatedRoute, private location: Location) {
    faqService.getFaqs().subscribe(faqs => {
      this.masterList = faqs;
      this.accordion = faqs.sort(DisplayFaq.sort).reverse();
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

  search(searchString?: string) {
    searchString = searchString ? searchString : this.question;
    if (searchString) {
      var split = searchString.split(' ').map(entry => entry.trim());
      this.accordion = this.accordion.filter(faq => {
        var tagsToSearch = faq.title.tags.map(x => x.toLowerCase()).concat(faq.content.tags.map(x => x.toLowerCase()));
        console.log(tagsToSearch);
        console.log(split);
        return split.some(x => tagsToSearch.includes(x));
      })
    }
    else {
      this.accordion = this.masterList;
    }
  }

  doFilter(filter: string) {
    this.accordion = this.masterList.filter(faq => {
      return (faq.title.tags.includes(filter) || faq.content.tags.includes(filter))
    });
  }

  removeFilter() {

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

  onKeyUp() {
    var that = this;
    this.delay(function () {
      var value = (<HTMLInputElement>document.getElementById("faq_question")).value;
      console.log(value);
      that.search(value);
      //alert('Time elapsed!' + value);
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
