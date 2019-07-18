import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentUserComponent } from './current-user/current-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/currentUser', pathMatch: 'full' },
  { path: 'currentUser', component: CurrentUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
