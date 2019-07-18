import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { LoadersLandingComponent } from './loaders-landing/loaders-landing.component';
import { LoadersMenuComponent } from './loaders-menu/loaders-menu.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { NewClientFormComponent } from './new-client-form/new-client-form.component';
import { ChangePassFormComponent } from './change-pass-form/change-pass-form.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export function tokenGetter() {
  return localStorage.getItem('TIST');
}

@NgModule({
  declarations: [
    AppComponent,
    LoadersLandingComponent,
    LoadersMenuComponent,
    ClientsListComponent,
    NewClientFormComponent,
    ChangePassFormComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost', '127.0.0.1'],
        authScheme: ''
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }