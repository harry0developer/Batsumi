import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { AppointmentsPage } from '../pages/appointments/appointments';
import { ProfilePage } from '../pages/profile/profile';
// import { HomePage } from '../pages/home/home';
// import { UsersPage } from '../pages/users/users';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserMoreDetailsPage } from '../pages/user-more-details/user-more-details';
import { FilterPage } from '../pages/filter/filter';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { AddSkillsPage } from '../pages/add-skills/add-skills';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OtpPage } from '../pages/otp/otp';
import { TermsPage } from '../pages/terms/terms';
// import { JobsPage } from '../pages/jobs/jobs';
import { PostJobsPage } from '../pages/post-jobs/post-jobs';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { MyJobsPage } from '../pages/my-jobs/my-jobs';
import { UserTypePage } from '../pages/user-type/user-type';
import { SetupPage } from '../pages/setup/setup';
import { CandidatesPage } from '../pages/candidates/candidates';
import { JobsPage } from '../pages/jobs/jobs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';


@NgModule({
  declarations: [
    MyApp,
    AppointmentsPage,
    ProfilePage,
    // HomePage,
    FilterPage,
    UserDetailsPage,
    UserMoreDetailsPage,
    PersonalDetailsPage,
    AddSkillsPage,
    LoginPage,
    SignupPage,
    OtpPage,
    TermsPage,
    PostJobsPage,
    AutocompletePage,
    JobDetailsPage,
    SettingsPage,
    StatsPage,
    MyJobsPage,
    UserTypePage,
    SetupPage,
    CandidatesPage,
    JobsPage,
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppointmentsPage,
    ProfilePage,
    // HomePage,
    FilterPage,
    UserDetailsPage,
    UserMoreDetailsPage,
    PersonalDetailsPage,
    AddSkillsPage,
    LoginPage,
    SignupPage,
    OtpPage,
    TermsPage,
    PostJobsPage,
    AutocompletePage,
    JobDetailsPage,
    SettingsPage,
    StatsPage,
    MyJobsPage,
    UserTypePage,
    SetupPage,
    CandidatesPage,
    JobsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Geolocation,
    SocialSharing
  ]
})
export class AppModule {}