import { Component, OnInit, SecurityContext } from '@angular/core';
import { Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IcDatepickerOptionsInterface } from 'ic-datepicker';

import { LocationsDataService } from '../../../locationsData.service';
import { LocationSelectedService } from '../../../locationSelected.service';
import { Location } from '../../../models/locationModel';
import * as moment from 'moment';



@Component({
  selector: 'app-loc-add',
  templateUrl: './loc-add.component.html',
  styleUrls: ['./loc-add.component.css']
})
export class LocAddComponent implements OnInit {
  datepickerOptions: IcDatepickerOptionsInterface;
  dateNow = moment().format('MMMM  Do, YYYY');
  dateNowNoFormat = moment().format();
  addLocationForm: FormGroup;

  constructor(private locationsDataService: LocationsDataService,
              private locationSelectedService: LocationSelectedService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
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

  onDeleteImage(index: number) {
    (<FormArray>this.addLocationForm.get('locationData.images')).removeAt(index);
  }

  onAddLocation() {
    const newLocation: Location = {
      dateActual: '',
      dateView: '',
      name: this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.nameInput),
      image: [],
      description: this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.descriptionInput)
    };

    newLocation.name = this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.nameInput);
    newLocation.description = this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.descriptionInput);

    newLocation.image = this.addLocationForm.value.locationData.images;

    // If no date selected, use today's date.
    newLocation.dateActual = this.dateNowNoFormat;
    if (!this.addLocationForm.value.locationData.dateInput) {
       newLocation.dateView = this.dateNow;
       newLocation.dateActual = this.dateNowNoFormat;
     } else {
       console.log(this.addLocationForm.value.locationData.dateInput);
       newLocation.dateView = this.addLocationForm.value.locationData.dateInput.format('MMMM  Do, YYYY');
       newLocation.dateActual = this.addLocationForm.value.locationData.dateInput.format();
     }

    this.locationsDataService.addLocation(newLocation);
    this.locationSelectedService.locationSelected.next(
      {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''}
    );
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
