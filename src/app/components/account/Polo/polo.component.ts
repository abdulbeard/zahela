import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { DisplayComment } from '../../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { DisplayChannel } from '../../../models/DisplayChannel';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper';

@Component({
  selector: 'app-account-polo',
  templateUrl: './polo.component.html',
  styleUrls: ['./polo.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class PoloComponent implements AfterViewInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
          this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = false;
    //this.cropperSettings.rounded = true;
    this.cropperSettings.keepAspect = true;
    // this.cropperSettings.croppedWidth = 100;
    // this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.cropperClass = "cropperClass";
    this.cropperSettings.croppingClass = "croppingClass";
    this.cropperSettings.preserveSize = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 1;
    this.data = {};
  }

  private imageData: string;
  private croppedImage: string;
  private data: any;
  public cropperSettings: CropperSettings;
  
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload = () => {
        var imagePayload = {
          Name: file.name,
          Size: file.size,
          Type: file.type,
          Data: reader.result.split(',')[1]
        };
        console.log(imagePayload);
        this.imageData = reader.result;
        //this.avatarService.uploadImage(imagePayload).subscribe(x => console.log(x), error => console.log(error));
      };
      var image: any = new Image();
      var that = this;
      reader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
      };
      reader.readAsDataURL(file);
    }
  }

  saveImage() {
    console.log(this.cropper);
  }

  imageCropped(event: any) {
    console.log(event);
    this.croppedImage = this.cropper.image.image;
  }

  get imageDataExists(): boolean {
    return this.imageData && this.imageData.length > 0;
  }
}
