import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LocationsDataService } from '../../locationsData.service';
import { LocationSelectedService } from '../../locationSelected.service';
import { Location } from '../../models/locationModel';

@Component({
  selector: 'app-loc-sidebar',
  templateUrl: './loc-sidebar.component.html',
  styleUrls: ['./loc-sidebar.component.css']
})
export class LocSidebarComponent implements OnInit {
  locations: Location[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService) { }

  ngOnInit() {
    // Get and sort locations by date.
    this.locations = this.locationsDataService.sampleData.sort(function(a, b) {
      return  +new Date(b.dateActual) - +new Date(a.dateActual);
    });
    // Subscribe and update when sample data in locationDataService changes.
    this.locationsDataService.sampleDataChanged.subscribe(
      (sampleData: Location[]) => {
        this.locations = sampleData.sort(function(a, b) {
          return  +new Date(b.dateActual) - +new Date(a.dateActual);
        });
      }
    );

  }

  onLocationWasSelected(locationIndex: number) {
    this.locationSelectedService.locationWasSelected.next(true);
    this.locationSelectedService.locationSelected.next(this.locations[locationIndex]);
    this.router.navigate(['/home', locationIndex], { relativeTo: this.route });
  }

  onAddLocation() {
    // Clear images on navigating to add location form.
    this.locationSelectedService.locationSelected.next(
      {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''}
    );
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
