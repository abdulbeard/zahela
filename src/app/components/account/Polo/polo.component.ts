import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper';
import { AuthService } from '../../../services/AuthService';
import { AvatarService } from '../../../services/AvatarService';
import { ModalService, ModalConfigBase } from '../../../services/ModalService';
import { ModalComponent } from '../../modals/recipe/modal.component';

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
  constructor(private authService: AuthService, private avatarService: AvatarService) {
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
    this.cropperSettings.fileType = "image/jpeg"
    this.data = {};
  }

  private imageData: string;
  private croppedImage: string;
  private data: any;
  public cropperSettings: CropperSettings;

  onFileChange(event) {
    let reader = new FileReader();
    let currentUser = this.authService.getCurrentDisplayUser();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.onload = () => {
        var imagePayload = {
          UserId: currentUser.Username,
          Image: {
            Name: file.name,
            Size: file.size,
            Type: file.type,
            //Data: reader.result.split(',')[1]
          }
        };
        console.log(imagePayload);
        //this.imageData = reader.result;
        this.avatarService.uploadImage(imagePayload).subscribe(x => console.log(x), error => console.log(error));
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
    this.avatarService.uploadImage(this.getImageUploadRequest()).subscribe(x => console.log(x), error => console.log(error));
  }

  imageCropped(event: any) {
    this.croppedImage = this.cropper.image.image;
  }

  get imageDataExists(): boolean {
    return this.imageData && this.imageData.length > 0;
  }

  getImageUploadRequest() {
    var split = this.croppedImage.split(',');
    var data = split[1];
    var fileType = ((split[0].split(';')[0]).split(':')[1]);
    var currentUser = this.authService.getCurrentDisplayUser();
    console.log(currentUser);
    return {
      UserId: currentUser.Username,
      Image: {
        Type: fileType,
        Data: data
      }
    };
  }

  showModal(){
    ModalService.showModal(new ModalConfigBase({
      text:"aaaaaaa",
    },
    ModalComponent,
    (success: boolean) => {
      console.log(this, success);
      return false;
    }));
  }
}
