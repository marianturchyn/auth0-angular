import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Auth0Lock } from 'auth0-lock';

@Component({
  selector: 'app-lock-login',
  templateUrl: './lock-login.component.html',
  styleUrls: ['./lock-login.component.scss']
})
export class LockLoginComponent {
  auth0Options = {
    closable: true,
    theme: {
      primaryColor: '#DFA612'
    },
    auth: {
      redirect: false,
      redirectUrl: environment.auth.callbackURL,
      responseType: 'token id_token',
      audience: `https://${environment.auth.domain}/userinfo`,
      params: {
        scope: 'openid profile email'
      }
    },
    additionalSignUpFields: [
      {
        name: 'address',
        placeholder: 'enter your address',
        // The following properties are optional
        ariaLabel: 'Address',
        icon: 'https://example.com/assets/address_icon.png',
        prefill: 'street 123',
        validator: function (address) {
          return {
            valid: address.length >= 10,
            hint: 'Must have 10 or more chars' // optional
          };
        }
      },
      {
        type: 'select',
        name: 'location',
        placeholder: 'choose your location',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'fr', label: 'France' },
          { value: 'ar', label: 'Argentina' }
        ],
        // The following properties are optional
        ariaLabel: 'Location',
        icon: 'https://example.com/assets/location_icon.png',
        prefill: 'us'
      },
      {
        type: 'checkbox',
        name: 'newsletter',
        prefill: 'true',
        placeholder: 'I hereby agree that I want to receive marketing emails from your company',
        // placeholderHTML - is an optional field and overrides the value of placeholder
        // do not use user inputted data for HTML fields as they are vulnerable to XSS
        placeholderHTML:
          '<b>I hereby agree that I want to receive marketing emails from your company</b>',
        // ariaLabel - is an optional field
        ariaLabel: 'Activate Newsletter'
      }
    ],
    autoclose: true,
    showTerms: true,
    useRefreshTokens: true,
    cacheLocation: "localstorage"
  };

  lock = new Auth0Lock(
    environment.auth.clientId,
    environment.auth.domain,
    this.auth0Options
  );

  profile;

  constructor(private router: Router, private http: HttpClient) {
    this.lock.checkSession({}, (error, authResult) => {
      if (error || !authResult) {
        this.lock.show();
      } else {
        // user has an active session, so we can use the accessToken directly.
        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log(error);
            return;
          };

          console.log(authResult.accessToken);
          console.log(profile);
          this.profile = profile;
        });
      }
    });

    this.lock.on("authenticated", (authResult: any) => {
      this.lock.getProfile(authResult.accessToken, async (error: any, profile: any) => {
        if (error) throw new Error('error');
        // code

        console.log(authResult.accessToken);
        console.log(profile);
        this.profile = profile;
      });
    });
  }

  login() {
    this.lock.show()
  }

  logout() {
    this.lock.logout();
  }

}
