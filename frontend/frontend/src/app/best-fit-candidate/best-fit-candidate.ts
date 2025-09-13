import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-best-fit-candidate',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, RouterModule],
  templateUrl: './best-fit-candidate.html',
  styleUrls: ['./best-fit-candidate.css']
})
export class BestFitCandidate implements OnInit {
  jobs: any[] = [];
  selectedJobId: string = '';
 
  topN = 5;
  candidates: any[] = [];
 
  constructor(private jobService: JobService) {}
 
  getSkillsAsString(c: any): string {
  return c.skills?.map((s: any) => s.skill).join(', ') || '';
}
 
 
  ngOnInit() {
    this.jobService.list().subscribe({
      next: (j) => this.jobs = j || []
    });
  }
 
  fetchTop() {
    if (!this.selectedJobId) { alert('Select a job first'); return; }
    const top = this.topN || 5;
    this.jobService.recommend(this.selectedJobId, top).subscribe({
      next: (res) => this.candidates = res || [],
      error: () => alert('Failed to fetch recommendations')
    });
  }
}
 
 