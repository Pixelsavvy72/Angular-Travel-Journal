import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IcDatepickerOptionsInterface } from 'ic-datepicker';

import { LocationsDataService } from '../../../locationsData.service';
import { LocationSelectedService } from '../../../locationSelected.service';
import { Location } from '../../../models/locationModel';
import * as moment from 'moment';


@Component({
  selector: 'app-loc-edit',
  templateUrl: './loc-edit.component.html',
  styleUrls: ['./loc-edit.component.css']
})
export class LocEditComponent implements OnInit {
  datepickerOptions: IcDatepickerOptionsInterface;
  editLocationForm: FormGroup;
  id: number;
  editMode = false;
  currentDate: String;
  dateActual = moment().format();
  dateNow = moment().format('MMMM  Do, YYYY');

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
          // Used in html to show current date.
          if (this.editMode) {
            this.currentDate = this.locationDataService.getLocation(this.id).dateView;
          }
          this.initForm();
        }
    );
  }

  private initForm() {
    let locationName = '';
    let locationDesc = '';
    let locationDateView = '';
    let locationDateActual = this.dateActual;
    let locationImages = new FormArray([]);

    // Populate the fields except for date.
    if (this.editMode) {
      const location = this.locationDataService.getLocation(this.id);
      locationName = location.name;
      locationDesc = location.description;
      locationDateView = '';
      locationDateActual = '';

      // Check for images in array. If they exist, add and populate controls.
      if (location['image']) {
        for (let image of location.image) {
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
      dateActual: '',
      dateView: '',
      name: this.sanitizer.sanitize(SecurityContext.HTML, this.editLocationForm.value.locationData.nameInput),
      image: [],
      description: this.sanitizer.sanitize(SecurityContext.HTML, this.editLocationForm.value.locationData.descriptionInput)
    };

    newLocation.image = this.editLocationForm.value.locationData.images;

    // DATE input
    if (!this.editLocationForm.value.locationData.dateInput && this.editMode) {
      // If no date is entered, set it here from previous value in array.
      // Must be done here to have conditional check pass/fail.
       newLocation.dateView = this.locationDataService.getLocation(this.id).dateView;
       newLocation.dateActual  = this.locationDataService.getLocation(this.id).dateActual;
     }

     if (!this.editLocationForm.value.locationData.dateInput) {
      newLocation.dateView = this.dateNow;
      newLocation.dateActual = this.dateActual;
    } else {
      console.log(this.editLocationForm.value.locationData.dateInput);
      newLocation.dateView = this.editLocationForm.value.locationData.dateInput.format('MMMM  Do, YYYY');
      newLocation.dateActual = this.editLocationForm.value.locationData.dateInput.format();
    }


    if (this.editMode) {
      this.locationDataService.editLocation(this.id, newLocation);
    } else {
      this.locationDataService.addLocation(newLocation);
    }

    // Clear images in image-list.component after an image is removed during an edit.
    this.locationSelectedService.locationSelected.next(
      {dateActual: Date.now(), dateView: Date.now().toString(), name: '', image: [], description: ''}
    );

    this.onCancel();
  }

  onAddImages() {
    const control = new FormControl(null);
    (<FormArray>this.editLocationForm.get('locationData.images')).push(control);
    }

  getImageControls() {
    return(<FormArray>this.editLocationForm.get('locationData.images')).controls;
  }

  onDeleteImage(index: number) {
    (<FormArray>this.editLocationForm.get('locationData.images')).removeAt(index);

  }

  onDeleteLocation() {
    this.locationDataService.deleteLocation(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
