import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { ForumService } from '../../services/ForumService';
import { ForumTopic } from '../../models/ForumTopic';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '../../constants/Routes';

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
  }

  topics: ForumTopic[];
  topicId: string;
  topicSelected(topic: ForumTopic) {
    if (this.topics) {
      this.topics.forEach(element => {
        if (element.Id == topic.Id) {
          element.Active = true;
          this.location.replaceState(`/${Routes.forum}/${element.Id}`);
          return false;
        }
        else { element.Active = false; }
      });
    }
  }
}
