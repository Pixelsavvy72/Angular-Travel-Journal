import { Subject } from "rxjs/Subject";

import { Location } from './models/locationModel';
import * as moment from 'moment';

export class LocationsDataService {
  sampleDataChanged = new Subject<Location[]>();
  sampleData: Location[] = [
    new Location ( moment().subtract(2, 'days').format(), moment().subtract(2, 'days').format('MMMM  Do, YYYY') ,'Philadelphia', ['https://images.unsplash.com/photo-1508770218424-753a10cd8117?auto=format&fit=crop&w=1949&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 'https://images.unsplash.com/photo-1506636489208-f1d6c865744e?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'], 'The tour with Melissa was very interesting. It was nice to learn detailed information of how our country came to be and the processes that brought it there. There were only 3 people (including myself) on the tour, so it was nice,despite the cold and inclement weather.'),
    new Location ( moment().subtract(7, 'days').format(), moment().subtract(7, 'days').format('MMMM  Do, YYYY') , 'Boston', ['https://images.unsplash.com/photo-1433977299464-84606ceb3247?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 'https://images.unsplash.com/photo-1489515098258-60c0ad468fc6?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D', 'https://images.unsplash.com/photo-1455035104105-24a7614a7ea4?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'], 'I also recommend setting aside an entire morning to just walk around! Boston is a city that is fairly compact and easy to get around. Beacon Hill has some beautiful homes and the North End as well. There are little bits of history throughout the city including Paul Reveres home, cemetarys and the Freedom trail the goes throughout the city.')
  ];

  getLocation(index: number) {
    return this.sampleData[index];
  }

  addLocation(location: Location) {
    this.sampleData.unshift(location);
    this.sampleDataChanged.next(this.sampleData);
  }

  editLocation(index: number, location: Location) {
    this.sampleData[index] = location;
    this.sampleDataChanged.next(this.sampleData);
  }

  deleteLocation(index: number) {
    this.sampleData.splice(index, 1);
    this.sampleDataChanged.next(this.sampleData);
  }
}
