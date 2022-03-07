import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutListComponent } from './fitFocus-app/components/workouts/workout-list/workout-list.component';
import { WorkoutCreateComponent } from './fitFocus-app/components/workouts/workout-create/workout-create.component';

const routes: Routes = [
  { path: '', component: WorkoutListComponent },
  { path: 'create', component: WorkoutCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
