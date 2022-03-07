import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Workout } from './workout.model';

@Injectable({ providedIn: "root" })

export class WorkoutService {

  private workouts: Workout[] = [];
  private workoutUpdated = new Subject<{ workouts: Workout[]; workoutCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getWorkouts(workoutsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${workoutsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; workouts: any; maxWorkouts: number; }> (
      "http://localhost:3000/api/workouts" + queryParams
    )
    .pipe(
      map(workoutData => {
      return {
        workouts: workoutData.workouts.map(workout => {
        return {
          name: workout.name,
          details: workout.details,
          id: workout._id,
          imagePath: workout.imagePath
        };
      }),
      maxWorkouts: workoutData.maxWorkouts
      };
     })
    )
    .subscribe(transformedWorkoutData => {
      this.workouts = transformedWorkoutData.workouts;
      this.workoutUpdated.next({
        workouts: [...this.workouts],
        workoutCount: transformedWorkoutData.maxWorkouts
      });
    });
  }

  getWorkoutUpdateListener() {
    return this.workoutUpdated.asObservable();
  }

  getWorkout(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      details: string;
      imagePath: string;}>(
      "http://localhost:3000/api/workouts" + id
    );
  }

  addWorkout(name:string, details: string, image: File) {
    const workoutData = new FormData();
    workoutData.append("name", name);
    workoutData.append("details", details);
    workoutData.append("image", image, name);
    this.http
      .post<{ message: string; workout: string }> ("http://localhost:3000/api/workouts", workoutData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateWorkout(id: string, name: string, details: string, image: File | string) {
    let workoutData: Workout | FormData;
    if(typeof image === "object") {
      workoutData = new FormData();
      workoutData.append ("id", id);
      workoutData.append ("name", name);
      workoutData.append("details", details);
      workoutData.append("image", image, name);
  } else {
      workoutData = {
        id: id,
        name: name,
        details: details,
        imagePath: image
      };
    }
      this.http
      .put("http://localhost:3000/api/workouts/" + id, workoutData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteWorkout(workoutId: string) {
    return this.http
      .delete("http://localhost:3000/api/workouts/" + workoutId);
  }
}
