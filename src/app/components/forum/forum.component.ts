import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ForumService } from '../../services/ForumService';
import { ForumTopic } from '../../models/ForumTopic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';
import { DisplayComment } from '../../models/DisplayComment';
import { MobileUtils } from '../../utils/MobileUtils';
import { AuthService } from '../../services/AuthService';
import { User } from '../../models/CurrentUser';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: []
})
export class ForumComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (this.commentId && !this.selectedCommentFromUrl) {
      this.topicSelected(new ForumTopic("", this.topicId, "", true));
      this.selectedCommentFromUrl = true;
    }
  }
  selectedCommentFromUrl = false;

  constructor(private route: ActivatedRoute, private location: Location, private forumService: ForumService,
    private authService: AuthService) {

    this.currentUser = this.authService.getCurrentDisplayUser();
    //this.currentUser = DisplayGuest.default();
    //this.currentUser.name = "User1";

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
      this.commentId = param["comment"]
      console.log(this.commentId);
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
  commentId: string;
  topicMessages: Array<DisplayComment>;
  currentTopic: ForumTopic;
  isMobileView: boolean;
  showForumTopicsMobileSidebar: boolean;
  currentUser: User;
  newComment: string;

  mobileSidebarTopicSelected(topic: ForumTopic) {
    this.topicSelected(topic);
    this.hideMobileTopics();
  }
  showMobileTopics() { this.showForumTopicsMobileSidebar = true; return true; }
  hideMobileTopics() { this.showForumTopicsMobileSidebar = false; return true; }

  topicSelected(topic: ForumTopic) {
    console.log(this.currentUser);
    var topicId: string;
    if (this.topics) {
      this.topics.forEach(element => {
        if (element.Id == topic.Id) {
          topicId = element.Id;
          element.Active = true;
          this.currentTopic = element;
          console.log(this.currentUser);
          this.forumService.getMessagesForTopic(element.Id, this.currentUser.Username).subscribe(
            //this.forumService.getThreadedMessagesForTopic(element.Id, this.currentUser.name).subscribe(            
            x => { this.topicMessages = x; console.log(this.topicMessages); },
            error => console.log(error));
          this.location.replaceState(`/${Routes.forum}/${element.Id}`);
          this.showComment(this.commentId, topicId);
          return false;
        }
        else { element.Active = false; }
      });
    }
  }

  addReplyToParentComment(parentComment: DisplayComment, currentComment: DisplayComment) {
    if (!currentComment.showReplyTextbox) {
      currentComment.showReplyTextbox = true;
      return;
    }
    if (currentComment && currentComment.currentReply && currentComment.currentReply.length > 0) {
      if (!currentComment.currentReply.startsWith("@")) {
        currentComment.currentReply = `@${parentComment.user.name} ${currentComment.currentReply}`;
      }
      if (!parentComment.threadComments || parentComment.threadComments.length == 0) {
        parentComment.threadComments = new Array<DisplayComment>();
      }
      this.forumService.addComment(
        new DisplayComment({ name: this.currentUser.Username, img: "" }, currentComment.currentReply, new Date()),
        this.currentTopic.Id, parentComment.id).subscribe(x => {
          currentComment.currentReply = "";
        }, error => console.log(error));
      console.log(parentComment);
      console.log(currentComment);
    }
  }

  addReplyToCurrentComment(currentComment: DisplayComment) {
    if (!currentComment.showReplyTextbox) {
      currentComment.showReplyTextbox = true;
      return;
    }
    if (currentComment && currentComment.currentReply && currentComment.currentReply.length > 0) {
      if (!currentComment.currentReply.startsWith("@")) {
        currentComment.currentReply = `@${currentComment.user.name} ${currentComment.currentReply}`;
        this.forumService.addComment(
          new DisplayComment({ name: this.currentUser.Username, img: "" }, currentComment.currentReply, new Date()),
          this.currentTopic.Id, currentComment.id).subscribe(x => {
            currentComment.currentReply = "";
          }, error => console.log(error));
      }
      console.log(currentComment);
    }
  }

  submitComment() {
    console.log(this.newComment);
    if (this.newComment) {
      console.log('tryna submit new comment');
      this.forumService.addComment(
        new DisplayComment({ name: this.currentUser.Username, img: "" }, this.newComment, new Date()),
        this.currentTopic.Id, "").subscribe(x => {
          this.newComment = "";
        }, error => console.log(error));
    }
  }

  isCurrentlySelectedComment(displayComment: DisplayComment): boolean {
    return displayComment.id === this.commentId;
  }

  hideReplyBox(comment: DisplayComment) {
    comment.showReplyTextbox = false;
  }

  showComment(id: string, topicId: string) {
    if (id) {
      setTimeout(() => {
        var elem = document.getElementById(id + '');
        elem.scrollIntoView({behavior: "smooth"});
        // elem.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      }, 1000);
      this.location.replaceState(`/${Routes.forum}/${topicId}/${id}`);
    }
    console.log(id);
  }
}