import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared/navbar/navbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterModule],
  templateUrl: './resume-upload.html',
  styleUrls: ['./resume-upload.css']
})
export class ResumeUpload implements OnInit {
  candidateName = '';
  jobs: any[] = [];
  selectedJobId: string = '';
  selectedJob: any = null;
  selectedFile: File | null = null;
  isHrAdmin = false;
  uploadMessage = '';
  submitMessage = '';

  private apiUrl = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isHrAdmin = this.auth.getRole() === 'hr-admin';
    this.loadJobs();

    if (!this.isHrAdmin) {
      const username = this.auth.getUsername();
      if (username) this.candidateName = username;
    }

    this.route.queryParams.subscribe(params => {
      const jobId = params['jobId'];
      if (jobId) {
        this.selectedJobId = jobId;
        // If jobs already loaded, set selectedJob
        if (this.jobs.length > 0) {
          this.selectedJob = this.jobs.find(j => j._id === jobId) || null;
        }
      }
    });
  }

  loadJobs() {
    const headers = this.getAuthHeaders();
    this.http.get<any[]>(`${this.apiUrl}/resumes/jobs`, { headers }).subscribe({
      next: (data) => {
        this.jobs = data || [];
        if (this.selectedJobId) {
          this.selectedJob = this.jobs.find(j => j._id === this.selectedJobId) || null;
        }
      },
      error: () => alert('Failed to load jobs')
    });
  }

  onJobChange() {
    this.selectedJob = this.jobs.find(j => j._id === this.selectedJobId) || null;
  }

  viewJD() {
    if (this.selectedJob) {
      alert(`Title: ${this.selectedJob.title}\n\nPlease navigate to Job Descriptions page to read full details.`);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  getAuthHeaders() {
    const token = this.auth.getToken();
    return {
      Authorization: `Bearer ${token}`
    };
  }

  canUpload() {
    return this.candidateName.trim() !== '' && this.selectedJobId !== '' && this.selectedFile !== null;
  }

  canSubmit() {
    return this.candidateName.trim() !== '' && this.selectedJobId !== '' && this.selectedFile !== null;
  }

  uploadResume() {
    if (!this.canUpload()) {
      alert('Please fill all fields and select a file.');
      return;
    }
    const formData = new FormData();
    formData.append('candidateName', this.candidateName);
    formData.append('jobId', this.selectedJobId);
    if (this.selectedFile) {
      formData.append('resume', this.selectedFile);
    }

    const headers = new HttpHeaders(this.getAuthHeaders());

    this.http.post(`${this.apiUrl}/resumes/upload`, formData, { headers }).subscribe({
      next: (res: any) => {
        this.uploadMessage = res.msg || 'Uploaded successfully';
        this.selectedFile = null;
      },
      error: (err) => {
        alert('Upload failed: ' + (err.error?.msg || 'Server error'));
      }
    });
  }

  onSubmit() {
    this.uploadResume();
    this.submitMessage = 'Resume submitted successfully';
  }

  onAiButtonClick() {
    alert('AI Button clicked - functionality to be implemented.');
  }
}

