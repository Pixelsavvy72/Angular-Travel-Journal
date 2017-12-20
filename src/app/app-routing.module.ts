import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocShowComponent } from './main-display/locations/loc-show/loc-show.component';
import { LocAddComponent } from './main-display/locations/loc-add/loc-add.component';
import { LocEditComponent } from './main-display/locations/loc-edit/loc-edit.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { LocationsComponent } from './main-display/locations/locations.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add', component: LocAddComponent },
  // { path: 'location', component: LocationsComponent, children: [
    { path: 'home', component: LocationsComponent, children: [
      { path: '', component: LocShowComponent},
      { path: ':id', component: LocShowComponent},
      { path: ':id/edit', component: LocEditComponent}
    ] },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
