import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainDisplayComponent } from './main-display/main-display.component';
import { LocSidebarComponent } from './main-display/loc-sidebar/loc-sidebar.component';
import { LocAddComponent } from './main-display/locations/loc-add/loc-add.component';
import { LocEditComponent } from './main-display/locations/loc-edit/loc-edit.component';
import { LocShowComponent } from './main-display/locations/loc-show/loc-show.component';
import { LocImageListComponent } from './main-display/locations/loc-image-list/loc-image-list.component';
import { LocationsDataService } from './locationsData.service';
import { LocationSelectedService } from './locationSelected.service';
import { AppRoutingModule } from './app-routing.module';
import { LocationsComponent } from './main-display/locations/locations.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IcDatepickerModule, IcDatepickerService } from 'ic-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LocSidebarComponent,
    MainDisplayComponent,
    LocAddComponent,
    LocShowComponent,
    LocImageListComponent,
    LocEditComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IcDatepickerModule
  ],
  providers: [LocationsDataService, LocationSelectedService, IcDatepickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
