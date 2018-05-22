import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { ForumService } from '../../services/ForumService';
import { ForumTopic } from '../../models/ForumTopic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';
import { BasicDisplayComment, User, DisplayComment } from '../../models/DisplayComment';
import { MobileUtils } from '../../utils/MobileUtils';
import { AuthService } from '../../services/AuthService';
import { DisplayGuest } from '../../models/DisplayGuest';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: []
})
export class ForumComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private route: ActivatedRoute, private location: Location, private forumService: ForumService,
    private authService: AuthService) {

    this.currentUser = this.authService.getCurrentDisplayUser();
    this.currentUser = DisplayGuest.default();
    this.currentUser.name = "User1";

    var selectedDefaultTopic = false;
    var selectedTopicFromUrl = false;
    forumService.getForumTopicsForUser().subscribe(topics => {
      this.topics = topics;
      if (!this.topicId && !selectedTopicFromUrl) {
        this.topicSelected(topics[0]);
        selectedDefaultTopic = true;
      }
    }, error => console.log(error));
    route.params.subscribe(param => {
      this.topicId = param["topic"];
      if (this.topicId && !selectedDefaultTopic) {
        this.topicSelected(new ForumTopic("", this.topicId, "", true));
        selectedTopicFromUrl = true;
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
  currentUser: DisplayGuest;
  newComment: string;

  mobileSidebarTopicSelected(topic: ForumTopic) {
    this.topicSelected(topic);
    this.hideMobileTopics();
  }
  showMobileTopics() { this.showForumTopicsMobileSidebar = true; return true; }
  hideMobileTopics() { this.showForumTopicsMobileSidebar = false; return true; }

  topicSelected(topic: ForumTopic) {
    if (this.topics) {
      this.topics.forEach(element => {
        if (element.Id == topic.Id) {
          element.Active = true;
          this.currentTopic = element;
          //this.forumService.getMessagesForTopic(element.Id, this.currentUser.name).subscribe(
          this.forumService.getThreadedMessagesForTopic(element.Id, this.currentUser.name).subscribe(
            x => { this.topicMessages = x; },
            error => console.log(error));
          this.location.replaceState(`/${Routes.forum}/${element.Id}`);
          return false;
        }
        else { element.Active = false; }
      });
    }
  }

  addReplyToParentComment(parentComment: DisplayComment, currentComment: DisplayComment) {
    console.log(parentComment);
    console.log(currentComment);
  }

  addReplyToCurrentComment(currentComment: DisplayComment) {
    console.log(currentComment);
  }

  submitComment() {
    if (this.newComment) {
      this.forumService.addComment(new BasicDisplayComment({ name: this.currentUser.name, img: "" }, this.newComment, new Date()), this.currentTopic.Id);
    }
  }
}
