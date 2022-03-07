import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Workout } from '../../../services/workout.model';
import { WorkoutService } from "../../../services/workout.service";
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})

export class WorkoutCreateComponent implements OnInit {
  enteredName = "";
  enteredDetails = "";
  workout: Workout;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private workoutId: string;

  constructor(public workoutService: WorkoutService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      details: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("workoutId")) {
        this.mode = "edit";
        this.workoutId = paramMap.get("workoutId");
        this.isLoading = true;
        this.workoutService.getWorkout(this.workoutId).subscribe(workoutData => {
          this.isLoading = false;
          this.workout = {id: workoutData._id, name: workoutData.name, details: workoutData.details, imagePath: workoutData.imagePath};
          this.form.setValue({
            name: this.workout.name,
            details: this.workout.details,
            imagePath: workoutData.imagePath
          });
      });
    } else {
      this.mode = "create";
      this.workoutId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveWorkout() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === "create") {
      this.workoutService.addWorkout(
        this.form.value.name,
        this.form.value.details,
        this.form.value.image
        );
    } else {
      this.workoutService.updateWorkout(
        this.workoutId,
        this.form.value.name,
        this.form.value.details,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
