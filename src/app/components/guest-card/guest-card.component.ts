import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DisplayGuest } from '../../models/DisplayGuest';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.css'],
  providers: []
})
export class GuestCardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @Input()
  guest: DisplayGuest;
  
  constructor() {    
  }

  selectFriend(friend: DisplayGuest) {
    console.log(friend);
  }
}
