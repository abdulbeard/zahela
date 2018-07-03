import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DisplayGuest } from '../../models/DisplayGuest';

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
  
  constructor() {    
  }

  selectFriend(friend: DisplayGuest) {
    console.log(friend);
  }

  public newTestimonial: string;
  public submitTestimonial() {
    console.log(this.newTestimonial);
  }
}
