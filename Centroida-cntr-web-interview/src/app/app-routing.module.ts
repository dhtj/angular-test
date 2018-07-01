import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddressDetailsComponent } from './address-details/address-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'address', component: AddressDetailsComponent },
  { path: 'address/:id', component: AddressDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
