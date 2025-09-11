import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';

@Component({
  selector: 'app-job-descriptions',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './job-descriptions.html',
  styleUrls: []
})
export class JobDescriptions implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.list().subscribe(j => this.jobs = j || []);
  }

  viewFull(job: any) {
    // navigate to a full view screen later; for now show alert with full description
    alert(`Title: ${job.title}\n\nDescription:\n${job.description}`);
  }
}
