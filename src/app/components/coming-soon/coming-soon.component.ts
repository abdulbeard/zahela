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
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
  providers: []
})
export class ComingSoonComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(){}
}