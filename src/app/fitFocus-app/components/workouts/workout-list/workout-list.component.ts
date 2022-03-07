import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  isLoading = false;
  totalWorkouts = 0;
  workoutsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private workoutsSub: Subscription;

  constructor(public workoutService: WorkoutService) { }

  ngOnInit() {
    this.isLoading = true;
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage);
    this.workoutsSub = this.workoutService
      .getWorkoutUpdateListener()
      .subscribe((workoutData: {workouts: Workout[], workoutCount: number}) => {
        this.isLoading = false;
        this.totalWorkouts = workoutData.workoutCount;
        this.workouts = workoutData.workouts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.workoutsPerPage = pageData.pageSize;
    this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage);
  }

  onDelete(workoutId: string) {
    this.isLoading = true;
    this.workoutService.deleteWorkout(workoutId).subscribe(() => {
      this.workoutService.getWorkouts(this.workoutsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.workoutsSub.unsubscribe();
  }
}
