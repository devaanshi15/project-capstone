
import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-descriptions',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './job-descriptions.html',
  styleUrls: ['./job-descriptions.css']
})
export class JobDescriptions implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit() {
    this.jobService.list().subscribe(j => this.jobs = j || []);
  }

  // viewFull(job: any) {
  //   alert(`Title: ${job.title}\n\nDescription:\n${job.description}`);
  // }

  viewFull(job: any) {
    this.router.navigate(['/dashboard/job-description-view', job._id]);
  }
  

  apply(job: any) {
    this.router.navigate(['/dashboard/resume-upload'], { queryParams: { jobId: job._id } });
  }
}
