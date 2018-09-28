import { Component, AfterViewInit } from '@angular/core';
import { User, RSVPStatus } from '../../../models/CurrentUser';
import { AuthService } from '../../../services/AuthService';
import { UserService } from '../../../services/UserService';
import { NavigationExtras, Router } from '@angular/router';
import { Routes } from '../../../constants/Routes';

@Component({
  selector: 'app-account-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
  providers: []
})
export class RsvpComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  private user: User;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.user = authService.getCurrentDisplayUser();
    this.user.RSVPStatus = RSVPStatus.NotComing;
  }

  rsvpComingButtonClass(user: User) : string {
    return user.RSVPStatus === RSVPStatus.Coming ? "ui blue icon button yes" : "ui basic inverted blue icon button yes";
  }

  rsvpNotComingButtonClass(user: User): string {
    return user.RSVPStatus === RSVPStatus.NotComing ? "ui red icon button" : "ui basic inverted red icon button";
  }

  rsvpOptionSelected(user: User, rsvpStatus: string) {
    user.RSVPStatus = RSVPStatus[rsvpStatus];
    this.userService.updateRSVPStatus(user, user.RSVPStatus).subscribe(x => {
      console.log(x);
    });
  }

  goToDietaryRestrictions(user: User) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'userId': user.Id }
    };
    this.router.navigate([Routes.account, Routes.accountDietaryRestrictions], navigationExtras);
  }


  // get rsvpComingButtonClass() : string {
  //   return this.user.RSVPStatus === RSVPStatus.Coming ? "ui blue icon button" : "ui basic inverted blue icon button";
  // }

  // get rsvpNotComingButtonClass(): string {
  //   return this.user.RSVPStatus === RSVPStatus.NotComing ? "ui red icon button" : "ui basic inverted red icon button";
  // }

  // rsvpOptionSelected(rsvpStatus: string) {
  //   this.user.RSVPStatus = RSVPStatus[rsvpStatus];
  // }
}
