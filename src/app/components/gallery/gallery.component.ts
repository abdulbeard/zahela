import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { GalleryService } from '../../services/GalleryService';
import { GalleryImage } from '../../models/GalleryImage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class GalleryComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  private legacy: boolean = false;

  private images: Array<GalleryImage> = [];
  constructor(private galleryService: GalleryService, private activatedRoute: ActivatedRoute){
    if(!!activatedRoute.snapshot.queryParams.legacy){
      this.legacy = true;
    }
    this.galleryService.getAllEntries(this.legacy).subscribe(x => {
      console.log(x)
      this.images = x;
    });
  }

  getImageClass(galleryImage: GalleryImage){
    return `ui ${galleryImage["size"]} image`
  }

}
