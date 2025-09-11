
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { CreateJob } from './create-job/create-job';
import { ResumeUpload } from './resume-upload/resume-upload';
import { BestFitCandidate } from './best-fit-candidate/best-fit-candidate';
import { JobDescriptions } from './job-descriptions/job-descriptions';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard },
  // HR screens
  { path: 'dashboard/create-job', component: CreateJob },
  { path: 'dashboard/resume-upload', component: ResumeUpload },
  { path: 'dashboard/best-fit-candidate', component: BestFitCandidate },
  // Candidate screens
  { path: 'dashboard/job-descriptions', component: JobDescriptions },
  // fallback
  { path: '**', redirectTo: 'login' }
];
