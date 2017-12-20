 import { Component, OnInit, Input } from '@angular/core';
 import { LocationsDataService } from '../../locationsData.service';
 import { LocationSelectedService } from '../../locationSelected.service';
 import { Router } from '@angular/router';

 @Component({
   selector: 'app-locations',
   templateUrl: './locations.component.html',
   styleUrls: ['./locations.component.css']
 })


 export class LocationsComponent implements OnInit {

   locationSet: Boolean = false;
   constructor(private locationsDataService: LocationsDataService,
               private locationSelectedService: LocationSelectedService) { }

   ngOnInit() {
     this.locationSelectedService.locationWasSelected.subscribe(
       () => {
           this.locationSet = true;
       }
      );
    }



 }
