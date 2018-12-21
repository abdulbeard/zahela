import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { GalleryService } from '../../services/GalleryService';
import { GalleryImage } from '../../models/GalleryImage';
import { ActivatedRoute } from '@angular/router';
import { ModalService, ModalConfigBase } from '../../services/ModalService';
import { ModalComponent } from '../modals/recipe/modal.component';
import { GalleryModalComponent } from '../modals/gallery/gallery-modal.component';

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

  imgClicked(index: number = 0) {
    this.launchGalleryMode(index+1);
    return false;
  }

  launchGalleryMode(index: number = 1){
    ModalService.showModal(new ModalConfigBase({
      imagesList: this.images,
      startingPosition: index
    },
    GalleryModalComponent,
    (success: boolean) => {
      console.log(this, success);
      return true;
    }));
  }
}
