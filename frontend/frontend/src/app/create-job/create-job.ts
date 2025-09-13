import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { JobService } from '../services/job.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.css']
})
export class CreateJob implements OnInit {
  jobs: any[] = [];

  newJob: any = {
    title: '',
    description: '',
    location: '',
    experience: null,
    preferredSkillsStr: '',
    education: ''
  };

  editingJobId: string | null = null;
  editedJob: any = {};

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.list().subscribe(res => this.jobs = res || []);
  }

  addJob() {
    const payload = {
      title: this.newJob.title,
      location: this.newJob.location,
      experience: this.newJob.experience,
      description: this.newJob.description,
      preferredSkills: (this.newJob.preferredSkillsStr || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      education: this.newJob.education
    };
    this.jobService.create(payload).subscribe({
      next: (res) => {
        this.jobs.unshift(res);
        this.newJob = { title: '', description: '', location: '', experience: null, preferredSkillsStr: '', education: '' };
        alert('Job added successfully!');
      },
      error: () => alert('Failed to add job. Please try again.')
    });
  }

  confirmDelete(id: string) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    this.jobService.delete(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(j => j._id !== id);
        alert('Job deleted.');
      },
      error: () => alert('Failed to delete job.')
    });
  }

  editJob(job: any) {
    this.editingJobId = job._id;
    this.editedJob = { ...job, preferredSkillsStr: (job.preferredSkills || []).join(', ') };
  }

  saveEdit(job: any) {
    const payload = {
      title: this.editedJob.title,
      location: this.editedJob.location,
      experience: this.editedJob.experience,
      description: this.editedJob.description,
      preferredSkills: (this.editedJob.preferredSkillsStr || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      education: this.editedJob.education
    };
    this.jobService.update(job._id, payload).subscribe({
      next: (updated) => {
        const idx = this.jobs.findIndex(j => j._id === job._id);
        if (idx !== -1) this.jobs[idx] = updated;
        this.editingJobId = null;
        alert('Job updated successfully!');
      },
      error: () => alert('Failed to update job.')
    });
  }

  cancelEdit() {
    this.editingJobId = null;
  }
}

