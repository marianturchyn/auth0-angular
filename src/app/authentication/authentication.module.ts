import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockLoginComponent } from './lock-login/lock-login.component';
import { HttpClientModule } from '@angular/common/http';

const components = [
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
