import { Component, OnInit } from '@angular/core';

import { LocationSelectedService } from '../../../locationSelected.service';
import { Location } from '../../../models/locationModel';

@Component({
  selector: 'app-loc-image-list',
  templateUrl: './loc-image-list.component.html',
  styleUrls: ['./loc-image-list.component.css']
})
export class LocImageListComponent implements OnInit {

  selectedLocation: Location = {dateActual: '', dateView: Date.now().toString(), name: '', image: [], description: ''};

  constructor(private locationSelectedService: LocationSelectedService) { }

  ngOnInit() {
    this.locationSelectedService.locationSelected.subscribe(
      (location: Location) => this.selectedLocation = location
    );
  }
}
