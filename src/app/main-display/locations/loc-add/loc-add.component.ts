import { Component, OnInit, ElementRef, ViewChild, Output, SecurityContext } from '@angular/core';
import { LocationsDataService } from '../../../locationsData.service';
import { Location } from '../../../models/locationModel';
import * as moment from 'moment';
import { Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { IcDatepickerOptionsInterface } from 'ic-datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationSelectedService } from '../../../locationSelected.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';




@Component({
  selector: 'app-loc-add',
  templateUrl: './loc-add.component.html',
  styleUrls: ['./loc-add.component.css']
})
export class LocAddComponent implements OnInit {
  datepickerOptions: IcDatepickerOptionsInterface;
  dateNow = moment().format('MMMM  Do, YYYY');
  addLocationForm: FormGroup;
  newLocation: Location = {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''};
  value: any;

  constructor(private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.datepickerOptions = {
      disableWeekends: true
    };
    this.addLocationForm = new FormGroup({
      'locationData' : new FormGroup({
        'nameInput' : new FormControl(null, Validators.required),
        'dateInput' : new FormControl(null),
        'descriptionInput' : new FormControl(null),
        'images' : new FormArray([])
      })
    });

  } // end OnInit

  onAddImages() {
    const control = new FormControl(null);
    (<FormArray>this.addLocationForm.get('locationData.images')).push(control);
    }

  getImageControls() {
    return(<FormArray>this.addLocationForm.get('locationData.images')).controls;
  }

  onAddLocation() {

    this.newLocation.name = this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.nameInput);
    this.newLocation.description = this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.descriptionInput);

    this.newLocation.image = this.addLocationForm.value.locationData.images;

    this.newLocation.dateActual = Date.now();
    if (!this.addLocationForm.value.locationData.dateInput) {
       this.newLocation.dateView = this.dateNow;
       this.newLocation.dateActual = Date.now();
     } else {
       this.newLocation.dateView = this.addLocationForm.value.locationData.dateInput.format('MMMM  Do, YYYY');
     }

    this.locationsDataService.addLocation(this.newLocation);
    this.locationSelectedService.locationSelected.next(
      {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''}
    );
    this.addLocationForm.reset();
  }

}
