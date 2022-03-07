import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Workout } from './workout.model';

@Injectable({ providedIn: "root" })

export class WorkoutService {

  private workouts: Workout[] = [];
  private workoutUpdated = new Subject<Workout[]>();

  constructor(private http: HttpClient) {}

  getWorkouts() {
    this.http
    .get<{ message: string; workouts: any }> (
      "http://localhost:3000/api/workouts"
    )
    .pipe(map((workoutData) => {
      return workoutData.workouts.map(workout => {
        return {
          name: workout.name,
          details: workout.details,
          id: workout._id
        };
      });
    }))
    .subscribe(transformedWorkouts => {
      this.workouts = transformedWorkouts;
      this.workoutUpdated.next([...this.workouts]);
    });
  }

  getWorkoutUpdateListener() {
    return this.workoutUpdated.asObservable();
  }

  addWorkout(name:string, details: string) {
    const workout: Workout = { id: null, name: name, details: details };
    this.http
      .post<{ message: string, workoutId: string }> ("http://localhost:3000/api/workouts", workout)
      .subscribe(responseData => {
        const id = responseData.workoutId;
        workout.id = id;
        this.workouts.push(workout);
        this.workoutUpdated.next([...this.workouts]);
      });
  }

  deleteWorkout(workoutId: string) {
    this.http.delete("http://localhost:3000/api/workouts/" + workoutId)
    .subscribe(() => {
      const updatedWorkouts = this.workouts.filter(workout => workout.id !== workoutId);
      this.workouts = updatedWorkouts;
      this.workoutUpdated.next([...this.workouts]);
    });
  }
}
