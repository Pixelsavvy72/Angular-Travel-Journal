import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Location } from '../../../models/locationModel';
import { LocationsDataService } from '../../../locationsData.service';
import { LocationSelectedService } from '../../../locationSelected.service';

@Component({
  selector: 'app-loc-show',
  templateUrl: './loc-show.component.html',
  styleUrls: ['./loc-show.component.css']
})

export class LocShowComponent implements OnInit {
  locationSet: Boolean = false;
  selectedLocation: Location = {dateActual: '', dateView: Date.now().toString(), name: '', image: [], description: ''};
  id: number;
  constructor(private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedLocation = this.locationsDataService.getLocation(this.id);
        this.locationSelectedService.locationSelected.next(this.selectedLocation);
      });

  }

  onEditLocation() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}

