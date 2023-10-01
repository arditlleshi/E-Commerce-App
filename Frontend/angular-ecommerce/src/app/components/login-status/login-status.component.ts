import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from "@okta/okta-auth-js";
import { OKTA_AUTH, OktaAuthStateService } from "@okta/okta-angular";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage; // web browser storage

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth)
  {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }

  private getUserDetails() {
    if (this.isAuthenticated) {

      // Fetch the logged-in user details (user's claims)

      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          // retrieve the user's email from authentication response
          const email = res.email;

          // now store the email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(email));
        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens;
    this.oktaAuth.signOut();
  }
}
