import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from "aws-amplify";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  logout() {
    Auth.signOut();
    this.router.navigate(['login']);
  }

  userDisplayName = '';
  ngOnInit() { }
}
