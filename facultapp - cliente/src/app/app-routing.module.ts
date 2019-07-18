import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { RedirectionGuard } from './guards/redirection.guard';

const routes: Routes = [
  {path: '', redirectTo: '/studentHome', pathMatch: 'full'},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [RedirectionGuard]},
  {path: 'adminHome', component: AdminHomeComponent},
  {path: 'users', component: UsersListComponent},
  {path: 'studentHome', component: StudentHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
