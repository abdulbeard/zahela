import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayMenu } from '../../models/DisplayMenu';
import { DietaryRestrictionsDisplayGuest, Gender } from '../../models/DisplayGuest';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Routes } from '../../constants/Routes';
import { AvatarService } from '../../services/AvatarService';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper'
import { NotificationsService } from '../../services/NotificationsService';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: []
})
export class AccountComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private location: Location, private route: ActivatedRoute,
    private avatarService: AvatarService,
    private notificationsService: NotificationsService) {
    NotificationsService.NotificationCount.subscribe(x => {
      this.notificationCount = x;
      this.accountMenu[1].displayText = this.notificationCount > 0 ? `(${this.notificationCount}) Updates` : "Updates" ;
    });
    var tabToSelect = this.accountMenu[0];
    route.params.subscribe(param => {
      var selectedTabFromUrl = param["selectedTab"];
      if (selectedTabFromUrl) {
        tabToSelect = new DisplayMenu(selectedTabFromUrl, true, "");
      }
    }, (Error) => {
      console.log(Error);
    });
    this.accountMenuSelected(tabToSelect);
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

  linkedGuests: DietaryRestrictionsDisplayGuest[] = [
    new DietaryRestrictionsDisplayGuest("Abdul", ["badass"], "also badass", "bad@ass.com", Gender.Male),
    new DietaryRestrictionsDisplayGuest("Abdul1", ["badass1"], "also1 badass", "bad1@ass.com", Gender.Male),
    new DietaryRestrictionsDisplayGuest("Abdul2", ["badass2"], "also2 badass", "bad2@ass.com", Gender.Male)
  ]

  religiousRestrictions: Array<any> = [
    { name: "Bahå'i" },
    { name: "Buddhism" },
    { name: "Hinduism" },
    { name: "Judaism" },
    { name: "Islam" }
  ]

  dietaryRestrictionDefinitions: Array<any> = [
    { name: "Vegan", desc: "Plant based diet. No meat, fish, eggs or dairy." },
    { name: "Ovo-Vegetarian", desc: "Plant based diet. No meat, fish, eggs or dairy." },
    { name: "Lacto-Vegetarian", desc: "Plant based diet. No meat, fish, eggs or dairy." },
    { name: "Lacto-Ovo Vegetarian", desc: "Plant based diet. No meat, fish, eggs or dairy." },
    { name: "Pescetarian", desc: "Plant based diet. No meat, fish, eggs or dairy." }
  ]

  accountMenu: DisplayMenu[] = [
    new DisplayMenu("rsvp", false, "RSVP"),
    new DisplayMenu("updates", false, "Updates"),
    new DisplayMenu("dietaryRestrictions", false, "Dietary Restrictions"),
    new DisplayMenu("polo", false, "Polo"),
    new DisplayMenu("yolo", false, "Yolo"),
    new DisplayMenu("solo", false, "Solo")
  ]

  private showUpdates: boolean = false;
  private showRsvp: boolean = true;
  private showDietaryRestrictions: boolean = false;
  private showPolo: boolean = false;
  private showSolo: boolean = false;
  private showYolo: boolean = false;

  private imageData: string;
  private croppedImage: string;
  private data: any;
  public cropperSettings: CropperSettings;

  private notificationCount: number;

  accountMenuSelected(menu: DisplayMenu) {
    this.accountMenu.map(x => {
      x.active = x.name === menu.name;
      if (x.active) {
        this.showMenuItem(x);
      }
    });
    this.location.replaceState(`/${Routes.account}/${menu.name}`);
  }

  guestHasDietaryRestriction(tag: string, guest: DietaryRestrictionsDisplayGuest): boolean {
    return guest.dietaryRestrictions.includes(tag);
  }

  addDietaryRestriction(tag: string, guest: DietaryRestrictionsDisplayGuest) {
    if (guest.dietaryRestrictions.includes(tag)) {
      guest.dietaryRestrictions = guest.dietaryRestrictions.filter(x => x !== tag);
    }
    else {
      guest.dietaryRestrictions.push(tag);
    }
  }
  addReligiousRestriction(tag: string, guest: DietaryRestrictionsDisplayGuest) {
    if (guest.dietaryRestrictions.includes(tag)) {
      guest.dietaryRestrictions = guest.dietaryRestrictions.filter(x => x !== tag);
    }
    else {
      guest.dietaryRestrictions.push(tag);
    }
  }

  private toggle(panel: DietaryRestrictionsDisplayGuest) {
    this.linkedGuests.map((elem, index) => {
      if (elem !== panel) {
        elem.active = false;
      }
      else {
        if (elem.active) {
          elem.active = false;
        }
        else {
          elem.active = true;
        }
      }
    })
  }

  showMenuItem(displayMenu: DisplayMenu) {
    if (displayMenu.name == "rsvp") {
      //console.log("rsvp");
      this.showRsvp = true;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "updates") {
      //console.log("updates");
      this.showRsvp = false;
      this.showUpdates = true;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "dietaryRestrictions") {
      //console.log("dietary restrictions");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = true;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "polo") {
      //console.log("polo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = true;
      this.showYolo = false;
      this.showSolo = false;
    }
    else if (displayMenu.name == "solo") {
      //console.log("solo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = false;
      this.showSolo = true;
    }
    else if (displayMenu.name == "yolo") {
      //console.log("yolo");
      this.showRsvp = false;
      this.showUpdates = false;
      this.showDietaryRestrictions = false;
      this.showPolo = false;
      this.showYolo = true;
      this.showSolo = false;
    }
  }

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
