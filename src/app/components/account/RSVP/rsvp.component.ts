import { Component, AfterViewInit } from '@angular/core';
import { User, RSVPStatus } from '../../../models/CurrentUser';
import { AuthService } from '../../../services/AuthService';
import { UserService } from '../../../services/UserService';
import { NavigationExtras, Router } from '@angular/router';
import { Routes } from '../../../constants/Routes';
import { TokenUtils } from '../../../utils/TokenUtils';
import { UserSessionService } from '../../../services/UserSessionService';

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
  }

  rsvpComingButtonClass(user: User) : string {
    return user.RSVPStatus === RSVPStatus.Coming ? "ui blue icon button yes" : "ui basic inverted blue icon button yes";
  }

  rsvpNotComingButtonClass(user: User): string {
    return user.RSVPStatus === RSVPStatus.NotComing ? "ui red icon button" : "ui basic inverted red icon button";
  }

  rsvpMaybeButtonClass(user: User) : string {
    return user.RSVPStatus === RSVPStatus.Maybe ? "ui green icon button" : "ui basic inverted green icon button"
  }

  rsvpOptionSelected(user: User, rsvpStatus: string) {
    user.RSVPStatus = RSVPStatus[rsvpStatus];
    console.log(user.RSVPStatus);
    this.userService.updateRSVPStatus(user, user.RSVPStatus).subscribe(x => {
      var header = x.headers.get('access-token');
      var headerUser = TokenUtils.tokenToUser(header);
      if(this.user && headerUser && this.user.Id === headerUser.Id){
        TokenUtils.setToken(header);
        UserSessionService.setCurrentUser(headerUser);
        this.user = headerUser;
      }
      else if (this.user && headerUser) {
        this.user.LinkedGuests.forEach(x => {
          if(x.Id === headerUser.Id) {
            x = headerUser;
          }
        })
      }

      
      TokenUtils.decodeToken(header);
      console.log(x.body);
    });
  }

  goToDietaryRestrictions(user: User) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'userId': user.Id }
    };
    this.router.navigate([Routes.account, Routes.accountDietaryRestrictions], navigationExtras);
  }

  gotToSchedule() {
    this.router.navigate([Routes.account, Routes.accountSchedule]);
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
