import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientsLandingComponent } from './clients-landing/clients-landing.component';
import { InvoicePanelComponent } from './invoice-panel/invoice-panel.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ChangePassFormComponent } from './change-pass-form/change-pass-form.component';
import { OnlyDatePipe } from './pipes/only-date.pipe';

export function tokenGetter() {
  return localStorage.getItem('TIST');
}

@NgModule({
  declarations: [
    AppComponent,
    ClientsLandingComponent,
    InvoicePanelComponent,
    ChangePassFormComponent,
    OnlyDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
