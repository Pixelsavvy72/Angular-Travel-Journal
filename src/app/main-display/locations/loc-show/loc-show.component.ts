import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/locationModel';
import { LocationsDataService } from '../../../locationsData.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { LocationSelectedService } from '../../../locationSelected.service';

@Component({
  selector: 'app-loc-show',
  templateUrl: './loc-show.component.html',
  styleUrls: ['./loc-show.component.css']
})

export class LocShowComponent implements OnInit {
  locationSet: Boolean = false;
  selectedLocation: Location = {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''};
  id: number;
  constructor(private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    // Below changes location based on locationSelectedService
    // this.locationSelectedService.locationSelected.subscribe(
    //    (location: Location) => this.selectedLocation = location
    //  );


    // This changes location based on route params instead.
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedLocation = this.locationsDataService.getLocation(this.id);
        // return this.route.params;
      });

  }

  onEditLocation() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}

