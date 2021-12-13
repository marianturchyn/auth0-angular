import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const components = [
  AuthButtonComponent,
  UserProfileComponent,
  AuthMenuComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class AuthenticationModule { }
