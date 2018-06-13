import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../../services/EmojiService';
import { SlackMessageParsingService } from '../../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../../services/SlackMessagesService';
import { UserService } from '../../../services/UserService';
import { DisplayComment } from '../../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../../services/SlackReactionsService';
import { DisplayChannel } from '../../../models/DisplayChannel';
import { DietaryRestrictionsDisplayGuest, Gender } from '../../../models/DisplayGuest';

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
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
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

  guestHasDietaryRestriction(tag: string, guest: DietaryRestrictionsDisplayGuest): boolean {
    return guest.dietaryRestrictions.includes(tag);
  }

  guestHasReligiousRestriction(tag: string, guest: DietaryRestrictionsDisplayGuest): boolean {
    return guest.religiousRestrictions.includes(tag);
  }

  guestHasAllergy(tag: string, guest: DietaryRestrictionsDisplayGuest): boolean {
    return guest.allergies.includes(tag);
  }

  addAllergy(tag: string, guest: DietaryRestrictionsDisplayGuest) {
    if (guest.allergies.includes(tag)) {
      guest.allergies = guest.allergies.filter(x => x !== tag);
    }
    else {
      guest.allergies.push(tag);
    }
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
    if (guest.religiousRestrictions.includes(tag)) {
      guest.religiousRestrictions = guest.religiousRestrictions.filter(x => x !== tag);
    }
    else {
      guest.religiousRestrictions.push(tag);
    }
  }

  save(guest: DietaryRestrictionsDisplayGuest) {
    console.log(guest);
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
}
