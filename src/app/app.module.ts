import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { WorkoutTrackerComponent } from './fitFocus-app/workout-tracker/workout-tracker.component';
import { HealthTrackerComponent } from './fitFocus-app/health-tracker/health-tracker.component';
import { ChallengesComponent } from './fitFocus-app/challenges/challenges.component';
import { DashboardComponent } from './fitFocus-app/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    WorkoutTrackerComponent,
    HealthTrackerComponent,
    ChallengesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
