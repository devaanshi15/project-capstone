import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { BestFitCandidate } from './best-fit-candidate/best-fit-candidate';
import { JobDescriptions } from './job-descriptions/job-descriptions';
import { ResumeUpload } from './resume-upload/resume-upload';
import { CreateJob } from './create-job/create-job';
import { JobDescriptionView } from './job-description-view/job-description-view';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard },
  // HR screens
  { path: 'dashboard/create-job', component: CreateJob },
  { path: 'dashboard/best-fit-candidate', component: BestFitCandidate },
  { path: 'dashboard/resume-upload', component: ResumeUpload },
  // Candidate screens
  { path: 'dashboard/job-description-view/:id', component: JobDescriptionView },
  { path: 'dashboard/job-descriptions', component: JobDescriptions },
  // fallback
  { path: '**', redirectTo: 'login' }
];
