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
import { PlaylistEntry, ApprovalStatus } from '../../models/PlaylistEntry';
import { UserSessionService } from '../../services/UserSessionService';

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

  constructor(private playlistService: PlaylistService) {
    this.getPlaylistEntries();
  }

  public playlistEntries: Array<PlaylistEntry> = [];
  tryingToRecommendSong: boolean = false;
  successfullySubmitted: boolean = false;
  urlFlow: boolean = false;
  manualFlow: boolean = false;
  urlComment: string;
  manualComment: string;

  songUrl: string;

  songArtist: string;
  songAlbum: string;
  songName: string;
  songYear: number;

  resetRecommendationStates(){
    this.tryingToRecommendSong = false;
    this.urlFlow = false;
    this.manualFlow = false;
    this.successfullySubmitted = false;
    this.urlComment = '';
    this.manualComment = '';
    this.songUrl = '';
    this.songArtist = '';
    this.songAlbum = '';
    this.songName = '';
    this.songYear = 0;
  }

  getPlaylistEntries(){
    this.playlistService.getAllEntries().subscribe(x => {
      this.playlistEntries = x;
    });
  }

  showSuccessfulSubmission() {
    this.successfullySubmitted = true;
    setTimeout(() => {
      this.successfullySubmitted = false;
    }, 5000);
  }

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
    var entry = new PlaylistEntry(
      this.songUrl, "", "", 0, "", "", "", "", this.urlComment, ApprovalStatus.None
      );
    this.playlistService.addEntry(entry).subscribe(x => {
      console.log(x);
      this.resetRecommendationStates();
      this.showSuccessfulSubmission();
      this.getPlaylistEntries();
    });
  }

  submitManualRecommendation(){
    console.log(this.songName, this.songArtist, this.songAlbum, this.songYear, this.manualComment);
    var user = UserSessionService.getCurrentUser();
    var entry = new PlaylistEntry(
      null, this.songArtist, this.songAlbum, this.songYear, this.songName, null, user.Id, user.Username, this.manualComment, ApprovalStatus.None
      );
    this.playlistService.addEntry(entry).subscribe(x => {
      this.resetRecommendationStates();
      this.showSuccessfulSubmission();
      this.getPlaylistEntries();
      console.log(x);
    });
  }
}
