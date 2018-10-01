import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayFaq, FaqTitle, FaqContent } from '../../models/DisplayFaq';
import { FaqService } from '../../services/FaqService';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute, private location: Location, private router: Router) {
    faqService.getFaqs().subscribe(faqs => {
      this.masterList = faqs;
      this.accordion = faqs.sort(DisplayFaq.sort).reverse();
      this.openFaqFromUrl();
      if(this.filterFromUrl){
        this.doFilter(this.filterFromUrl);
      }
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
    });
    this.route.queryParams.subscribe(x =>{
      console.log(x);
      this.filterFromUrl = x.filter;
      if(this.filterFromUrl && this.masterList){
        this.doFilter(this.filterFromUrl);
      }
    });
  }

  private masterList: DisplayFaq[];
  accordion: DisplayFaq[];
  filters: Array<string>;
  private faqFromUrl: string;
  private filterFromUrl: string;
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
    this.editState();
  }

  removeFilter(event: any) {
    event.stopPropagation();
    this.question = "";
    this.search();
    this.editState();
  }

  private askQuestion() {
    var user = UserSessionService.getCurrentUser();
    this.faqService.askQuestion(user, this.question).subscribe(x => {
      console.log(x);
    });
  }

  editState(faqId?: string) {
    var parseResult = this.router.parseUrl(this.location.path());
    var filterQuery = this.question ? `?filter=${this.question}` : ``;
    if(faqId){
      this.location.replaceState(`/${Routes.faq}/${faqId}${filterQuery}`);
    }
    else {
      var urlPath = `/${parseResult.root.children.primary.segments.join("/")}${filterQuery}`;
      this.location.replaceState(urlPath);
    }    
  }

  private toggle(panel: DisplayFaq) {
    console.log(this.router.parseUrl('/faq/872418a8-7699-4dfe-a898-47a836325beb?filter=website'));
    //console.log(this.location.normalize(''));
    // this.location.replaceState(`/${Routes.faq}/${panel.id}?filter=website`);
    this.editState(panel.id);
    console.log(this.location.path());

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
