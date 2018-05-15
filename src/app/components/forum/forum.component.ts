import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { ForumService } from '../../services/ForumService';
import { ForumTopic } from '../../models/ForumTopic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';
import { BasicDisplayComment } from '../../models/DisplayComment';
import { MobileUtils } from '../../utils/MobileUtils';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: []
})
export class ForumComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private route: ActivatedRoute, private location: Location, private forumService: ForumService) {
    forumService.getForumTopicsForUser().subscribe(x => {
      this.topics = x;
      if (this.topicId) {
        this.topicSelected(new ForumTopic("", this.topicId, "", true));
      }
      else {
        this.topicSelected(x[0]);
      }
    }, error => console.log(error));
    route.params.subscribe(param => {
      this.topicId = param["topic"];
      if (this.topicId) {
        this.topicSelected(new ForumTopic("", this.topicId, "", true));
      }
    }, (Error) => {
      console.log(Error);
    });
    this.isMobileView = MobileUtils.getIsMobileView();
    MobileUtils.IsMobileView.subscribe(x => this.isMobileView = x);
  }

  topics: ForumTopic[];
  topicId: string;
  topicMessages: Array<BasicDisplayComment>;
  currentTopic: ForumTopic;
  isMobileView: boolean;
  showForumTopicsMobileSidebar: boolean;

  mobileSidebarTopicSelected(topic: ForumTopic) {
    this.topicSelected(topic);
    this.hideMobileTopics();
  }
  showMobileTopics(){this.showForumTopicsMobileSidebar = true; return true;}
  hideMobileTopics(){this.showForumTopicsMobileSidebar = false; return true;}

  topicSelected(topic: ForumTopic) {
    if (this.topics) {
      this.topics.forEach(element => {
        if (element.Id == topic.Id) {
          element.Active = true;
          this.currentTopic = element;
          this.forumService.getMessagesForTopic().subscribe(x => { this.topicMessages = x; }, error => console.log(error));
          this.location.replaceState(`/${Routes.forum}/${element.Id}`);
          return false;
        }
        else { element.Active = false; }
      });
    }
  }
}
