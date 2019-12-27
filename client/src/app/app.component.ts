import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(private router: Router, private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
          this.user = null;
      } else {
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
          console.log(this.greeting);
          this.router.navigate(['home']);
      }
    });
  }
}