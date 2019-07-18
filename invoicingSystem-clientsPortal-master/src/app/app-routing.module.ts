import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsLandingComponent } from './clients-landing/clients-landing.component';
import { InvoicePanelComponent } from './invoice-panel/invoice-panel.component';
import { ChangePassFormComponent } from './change-pass-form/change-pass-form.component';

const routes: Routes = [
  { path: "", redirectTo: "/clientsLanding", pathMatch: "full" },
  { path: "clientsLanding", component: ClientsLandingComponent },
  { path: "invoicePanel", component: InvoicePanelComponent },
  { path: "changePassword", component: ChangePassFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }