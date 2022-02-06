import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutTrackerComponent } from './fitFocus-app/workout-tracker/workout-tracker.component';
import { HealthTrackerComponent } from './fitFocus-app/health-tracker/health-tracker.component';
import { ChallengesComponent } from './fitFocus-app/challenges/challenges.component';
import { DashboardComponent } from './fitFocus-app/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'workout tracker',
    component: WorkoutTrackerComponent,
  },
  {
    path: 'health tracker',
    component: HealthTrackerComponent,
  },
  {
    path: 'challenges',
    component: ChallengesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
