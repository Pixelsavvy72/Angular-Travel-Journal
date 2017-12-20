import { Subject } from "rxjs/Subject";

export class LocationSelectedService {
  locationWasSelected = new Subject();
  locationSelected = new Subject();
}
