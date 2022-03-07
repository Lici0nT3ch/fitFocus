import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WorkoutService } from "../../../services/workout.service";

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})

export class WorkoutCreateComponent {
  enterTitle = "";
  enteredDetails = "";

  constructor(public workoutService: WorkoutService) {}

  onAddWorkout(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.workoutService.addWorkout(form.value.name, form.value.details);
    form.resetForm();
  }
}
