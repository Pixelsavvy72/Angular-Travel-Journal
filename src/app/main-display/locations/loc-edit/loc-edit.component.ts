import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocationsDataService } from '../../../locationsData.service';
import { Location } from '../../../models/locationModel';
import { IcDatepickerOptionsInterface } from 'ic-datepicker';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as moment from 'moment';
import { LocationSelectedService } from '../../../locationSelected.service';


@Component({
  selector: 'app-loc-edit',
  templateUrl: './loc-edit.component.html',
  styleUrls: ['./loc-edit.component.css']
})
export class LocEditComponent implements OnInit {
  editLocationForm: FormGroup;
  id: number;
  editMode = false;
  datepickerOptions: IcDatepickerOptionsInterface;
  dateNow = moment().format('MMMM  Do, YYYY');
  currentDate: String;
  dateActual = moment().format();


  constructor(private locationDataService: LocationsDataService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private locationSelectedService: LocationSelectedService ) { }

    ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.currentDate = this.locationDataService.getLocation(this.id).dateView;
          this.initForm();
      }
    );
  }
  // this.newLocation.name = this.sanitizer.sanitize(SecurityContext.HTML, this.addLocationForm.value.locationData.nameInput);
  private initForm() {
    let locationName = '';
    let locationDesc = '';
    let locationDateView = '';
    let locationDateActual = this.dateActual;
    let locationImages = new FormArray([]);

    if (this.editMode) {
      const location = this.locationDataService.getLocation(this.id);
      locationName = location.name;
      locationDesc = location.description;
      locationDateView = location.dateView;
      locationDateActual = location.dateActual;

      // Check for images
      if (location['image']) {
        for (let image of location.image) {
          // Push new form group for each image because we need name and url.
          locationImages.push(
            new FormControl(image)
          );
        }
      }
    }

    this.editLocationForm = new FormGroup({
      'locationData' : new FormGroup({
        'nameInput': new FormControl(locationName, Validators.required),
        'descriptionInput': new FormControl(locationDesc, Validators.required),
        'dateInput' : new FormControl(locationDateView),
        'images': locationImages

      })
    });

  }

  onEditLocation() {
    const newLocation: Location = {
       dateActual: this.editLocationForm.value.locationData.dateInput.format(),
       dateView: this.editLocationForm.value.locationData.dateInput.format('MMMM  Do, YYYY'),
       name: this.editLocationForm.value.locationData.nameInput,
       image: this.editLocationForm.value.locationData.images,
       description: this.editLocationForm.value.locationData.descriptionInput
    };

    if (this.editMode) {
      console.log(this.locationDataService.getLocation(this.id));
      console.log(newLocation);
      this.locationDataService.editLocation(this.id, newLocation);
    } else {
      this.locationDataService.addLocation(newLocation);
    }
    this.onCancel();
  }

  onAddImages() {
    const control = new FormControl(null);
    (<FormArray>this.editLocationForm.get('locationData.images')).push(control);
    }

  getImageControls() {
    return(<FormArray>this.editLocationForm.get('locationData.images')).controls;
  }

  onDeleteLocation() {
    this.locationDataService.deleteLocation(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
