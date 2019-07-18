import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadersLandingComponent } from './loaders-landing/loaders-landing.component';
import { LoadersMenuComponent } from './loaders-menu/loaders-menu.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { NewClientFormComponent } from './new-client-form/new-client-form.component';
import { ChangePassFormComponent } from './change-pass-form/change-pass-form.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  
  { path: "", redirectTo: "/loadersLanding", pathMatch: "full" },
  { path: "loadersLanding", component: LoadersLandingComponent },
  { 
    path: "loadersMenu", component: LoadersMenuComponent, canActivate: [AuthenticatedGuard],
      children: [
        { path: "", redirectTo: "/loadersMenu/newClientForm", pathMatch: "full" },
        { path: "clientsList", component: ClientsListComponent, canActivate: [AuthenticatedGuard] },
        { path: "newClientForm", component: NewClientFormComponent, canActivate: [AuthenticatedGuard] },
        { path: "changePassword", component: ChangePassFormComponent, canActivate: [AuthenticatedGuard] }
      ]
  },
  { path: "unauthorized", component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }