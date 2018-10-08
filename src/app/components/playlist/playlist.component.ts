import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { PlaylistService } from '../../services/PlaylistService';
import { PlaylistEntry } from '../../models/PlaylistEntry';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class PlaylistComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  public playlistEntries: Array<PlaylistEntry> = [];
  tryingToRecommendSong: boolean = false;
  urlFlow: boolean = false;
  manualFlow: boolean = false;
  urlComment: string;
  manualComment: string;

  songUrl: string;

  songArtist: string;
  songAlbum: string;
  songName: string;
  songYear: number;

  cancelRecommendationFlow(){
    this.tryingToRecommendSong = false;
  }

  recommendSong(){
    this.tryingToRecommendSong = true;
  }

  doUrlFlow(){
    this.urlFlow = true;
    this.manualFlow = false;
    this.tryingToRecommendSong = false;
  }

  cancelUrlFlow() {
    this.urlFlow = false;
    this.tryingToRecommendSong = false;
    this.manualFlow = false;
  }

  doManualFlow() {
    this.manualFlow = true;
    this.urlFlow = false;
    this.tryingToRecommendSong = false;
  }

  cancelManualFlow(){
    this.cancelUrlFlow();
  }

  submitUrlRecommendation(){
    console.log(this.urlComment, this.songUrl);
  }

  submitManualRecommendation(){
    console.log(this.songName, this.songArtist, this.songAlbum, this.songYear, this.manualComment);
  }

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getAllEntries().subscribe(x => {
      this.playlistEntries = x;
    });
  }
}
