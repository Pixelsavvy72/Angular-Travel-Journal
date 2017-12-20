import { Component, OnInit } from '@angular/core';
import { Location } from './models/locationModel';
import { Input } from '@angular/core';
import { LocationsDataService } from './locationsData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  locations: { name: string, image: string[], description: string }[] = [];

  constructor(private locationsDataService: LocationsDataService) {

  }

  ngOnInit() {
    this.locations = this.locationsDataService.sampleData;
  }

}
