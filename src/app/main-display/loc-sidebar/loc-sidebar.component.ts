import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LocationsDataService } from '../../locationsData.service';
import { LocationSelectedService } from '../../locationSelected.service';
import { Location } from '../../models/locationModel';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
    this.locations = this.locationsDataService.sampleData;

  }

  onLocationWasSelected(locationIndex: number) {
    // Sets initial location for show component since it is loaded prior to subscription being called.
    // this.locationsDataService.selectedLocation = this.locationsDataService.getLocation(locationIndex);
    this.locationSelectedService.locationWasSelected.next(true);
    this.locationSelectedService.locationSelected.next(this.locations[locationIndex]);
    this.router.navigate(['/home', locationIndex], { relativeTo: this.route });


  }

  onAddLocation() {
    // Clear images on add location
    this.locationSelectedService.locationSelected.next(
      {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''}
    );
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
