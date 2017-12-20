import { Component, OnInit, Input } from '@angular/core';
import { LocationsDataService } from '../../../locationsData.service';
import { LocationSelectedService } from '../../../locationSelected.service';
import { Location } from '../../../models/locationModel';

@Component({
  selector: 'app-loc-image-list',
  templateUrl: './loc-image-list.component.html',
  styleUrls: ['./loc-image-list.component.css']
})
export class LocImageListComponent implements OnInit {

  selectedLocation: Location = {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''};

  constructor(private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService) { }

  ngOnInit() {
    this.locationSelectedService.locationSelected.subscribe(
      (location: Location) => this.selectedLocation = location
    );
  }
}
