import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DisplayGuest } from '../../models/DisplayGuest';
import { ActivatedRoute } from '@angular/router';
import { FriendsService } from '../../services/FriendsService';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css'],
  providers: []
})
export class GuestDetailComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @Input()
  guest: DisplayGuest;
  
  constructor(private route: ActivatedRoute, private friendsService: FriendsService) {    
    this.route.params.subscribe(x => {
      let guestId = x["id"];
      if (guestId) {
        this.friendsService.getGuestById(guestId).subscribe(x => {
          this.guest = x;
        });
      }
    });
  }

  selectFriend(friend: DisplayGuest) {
    console.log(friend);
  }

  public newTestimonial: string;
  public submitTestimonial() {
    console.log(this.newTestimonial);
  }
}
