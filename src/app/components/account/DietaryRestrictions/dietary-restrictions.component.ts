import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { User } from '../../../models/CurrentUser';
import { AuthService } from '../../../services/AuthService';
import { UserSessionService } from '../../../services/UserSessionService';

@Component({
  selector: 'app-account-dietary-restrictions',
  templateUrl: './dietary-restrictions.component.html',
  styleUrls: ['./dietary-restrictions.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class DietaryRestrictionsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(authService: AuthService) {
    var user = UserSessionService.getCurrentUser();
    if(!user){
      UserSessionService.userObservable.subscribe(user => {
        this.setup(user);
      }, error => {
        console.log(error);
      });
    }
    else {
      this.setup(user);
    }
    console.log(user);
    console.log('huh?');

  }

  setup(user: User) {
    if (user && user.LinkedGuests) {
      this.linkedGuests = user.LinkedGuests.map(x => new AccordionUser(x, false));
    }
  }

  linkedGuests: AccordionUser[] = [];

  religiousRestrictions: Array<any> = [
    { name: "Bahå'i" },
    { name: "Buddhism" },
    { name: "Hinduism" },
    { name: "Judaism" },
    { name: "Islam" }
  ]

  dietaryRestrictionDefinitions: Array<any> = [
    { name: "Vegan", desc: "Plant based diet. No meat, fish, eggs or dairy." },
    { name: "Ovo-Vegetarian", desc: "Plant based diet, with eggs. No dairy, meat or fish." },
    { name: "Lacto-Vegetarian", desc: "Plant based diet, with dairy. No meat, fish or eggs." },
    { name: "Lacto-Ovo Vegetarian", desc: "Plant based diet, with dairy and eggs.. No meat or fish." },
    { name: "Pescetarian", desc: "Vegetarian diet, with fish. No meat." }
  ]

  commonFoodAllergies: Array<any> = [
    { name: "Wheat", desc: "All wheat products" },
    { name: "Eggs", desc: "All egg products" },
    { name: "Soybean", desc: "All soy products" },
    { name: "Peanuts", desc: "All peanuts products" },
    { name: "Nut", desc: "All nutty products" },
    { name: "Milk", desc: "all dairy products" },
    { name: "Fish", desc: "all fish products" },
    { name: "Shellfish", desc: "all shellfish products" }
  ]

  guestHasDietaryRestriction(tag: string, guest: AccordionUser): boolean {
    return guest.user.DietaryRestrictions.includes(tag);
  }

  guestHasReligiousRestriction(tag: string, guest: AccordionUser): boolean {
    return guest.user.ReligiousRestrictions.includes(tag);
  }

  guestHasAllergy(tag: string, guest: AccordionUser): boolean {
    return guest.user.Allergies.includes(tag);
  }

  addAllergy(tag: string, guest: AccordionUser) {
    if (guest.user.Allergies.includes(tag)) {
      guest.user.Allergies = guest.user.Allergies.filter(x => x !== tag);
    }
    else {
      guest.user.Allergies.push(tag);
    }
  }

  addDietaryRestriction(tag: string, guest: AccordionUser) {
    if (guest.user.DietaryRestrictions.includes(tag)) {
      guest.user.DietaryRestrictions = guest.user.DietaryRestrictions.filter(x => x !== tag);
    }
    else {
      guest.user.DietaryRestrictions.push(tag);
    }
  }
  addReligiousRestriction(tag: string, guest: AccordionUser) {
    if (guest.user.ReligiousRestrictions.includes(tag)) {
      guest.user.ReligiousRestrictions = guest.user.ReligiousRestrictions.filter(x => x !== tag);
    }
    else {
      guest.user.ReligiousRestrictions.push(tag);
    }
  }

  save(guest: AccordionUser) {
    console.log(guest);
  }
  
  private toggle(panel: AccordionUser) {
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
}

export class AccordionUser {
  constructor(user: User, active: boolean) {
    this.user = user;
    this.active = active;
  };
  user: User;
  active: boolean;

  getCssClass(currentClass: string): string {
    return `${this.active ? "active" : ""} ${currentClass}`;
  }
}
