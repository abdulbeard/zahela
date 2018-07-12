import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { User } from '../../../models/CurrentUser';
import { AuthService } from '../../../services/AuthService';

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
    this.linkedGuests = authService.getCurrentDisplayUser().LinkedGuests.map(x => new AccordionUser(x, false));
  }

  linkedGuests: AccordionUser[];

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

  guestHasDietaryRestriction(tag: string, guest: User): boolean {
    return guest.DietaryRestrictions.includes(tag);
  }

  guestHasReligiousRestriction(tag: string, guest: User): boolean {
    return guest.ReligiousRestrictions.includes(tag);
  }

  guestHasAllergy(tag: string, guest: User): boolean {
    return guest.Allergies.includes(tag);
  }

  addAllergy(tag: string, guest: User) {
    if (guest.Allergies.includes(tag)) {
      guest.Allergies = guest.Allergies.filter(x => x !== tag);
    }
    else {
      guest.Allergies.push(tag);
    }
  }

  addDietaryRestriction(tag: string, guest: User) {
    if (guest.DietaryRestrictions.includes(tag)) {
      guest.DietaryRestrictions = guest.DietaryRestrictions.filter(x => x !== tag);
    }
    else {
      guest.DietaryRestrictions.push(tag);
    }
  }
  addReligiousRestriction(tag: string, guest: User) {
    if (guest.ReligiousRestrictions.includes(tag)) {
      guest.ReligiousRestrictions = guest.ReligiousRestrictions.filter(x => x !== tag);
    }
    else {
      guest.ReligiousRestrictions.push(tag);
    }
  }

  save(guest: User) {
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
