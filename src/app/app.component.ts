import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car, Trip } from "./resources";
import { Observable } from "rxjs";
import { DeserializeArray, JsonArray } from "cerializr";
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title: string = 'generic-mat-table';
  visibleCars: boolean = false;
  visibleTrips: boolean = false;
  cars$: Observable<Car[]>;
  trips$: Observable<Trip[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  buttonClick() {
    this.cars$ = this.http.get("/assets/car.json").pipe(
      map((res: JsonArray) => DeserializeArray(res, Car))
    );

    this.visibleCars = true;
  }

  receiveCarTableData(data: any) {
    const car = data as Car;
    this.showTrips(car);
  }

  showTrips(car: Car) {
    this.trips$ = this.http.get("/assets/trip.json").pipe(
      map((res: JsonArray) => DeserializeArray(res, Trip).filter(trip => trip.car_id === car.id))
    );

    this.visibleTrips = true;
  }
}
