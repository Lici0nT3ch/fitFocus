import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Workout } from '../../../services/workout.model';
import { WorkoutService } from '../../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})

export class WorkoutListComponent implements OnInit, OnDestroy {
  workouts: Workout[] = [];
  private workoutsSub: Subscription;

  constructor(public workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.getWorkouts();
    this.workoutsSub = this.workoutService.getWorkoutUpdateListener()
      .subscribe((workouts: Workout[]) => {
        this.workouts = workouts;
      });
  }

  onDelete(workoutId: string) {
    this.workoutService.deleteWorkout(workoutId);
  }

  ngOnDestroy(){
    this.workoutsSub.unsubscribe();
  }
}
