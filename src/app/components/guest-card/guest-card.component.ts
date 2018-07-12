import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { User } from '../../models/CurrentUser';

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
  guest: User;
  
  constructor() {    
  }

  selectFriend(friend: User) {
    console.log(friend);
  }
}
