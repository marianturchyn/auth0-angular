import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LockLoginComponent } from './lock-login/lock-login.component';
import { HttpClientModule } from '@angular/common/http';

const components = [
  AuthButtonComponent,
  UserProfileComponent,
  AuthMenuComponent,
  LockLoginComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [...components]
})
export class AuthenticationModule { }
