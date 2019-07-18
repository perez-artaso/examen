import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserNameComponent } from './components/user-name/user-name.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TypeSelectorComponent } from './components/users-list/type-selector/type-selector.component';
import { ListComponent } from './components/users-list/list/list.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { InscriptionComponent } from './components/student-home/inscription/inscription.component';
import { MyCoursesComponent } from './components/student-home/my-courses/my-courses.component';

export function tokenGetter() {
  return localStorage.getItem('SPToken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SuccessMessageComponent,
    AlertMessageComponent,
    CreateUserComponent,
    UserNameComponent,
    AdminHomeComponent,
    CoursesListComponent,
    UsersListComponent,
    TypeSelectorComponent,
    ListComponent,
    StudentHomeComponent,
    InscriptionComponent,
    MyCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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