import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { AuthService } from './services/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
  }
  title = 'app';

  routeForLogin() {
    console.log(this.router.url);    
    let navigationExtras: NavigationExtras = {
      queryParams: { 'returnUrl': this.router.url },
    };
    console.log("unauthorized");
    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
  }
}