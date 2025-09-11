import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar';
import { ResumeService } from '../services/resume.service';
import { JobService } from '../services/job.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './resume-upload.html',
  styleUrls: []
})
export class ResumeUpload implements OnInit {
  selectedFile: File | null = null;
  isDragOver = false;
  uploadedResumeId: string | null = null;
  aiResult: any = null;
  jobs: any[] = [];
  candidateName = '';
  selectedJobId: string | null = null;

  constructor(private resumeService: ResumeService, private jobService: JobService) {}

  ngOnInit() {
    this.jobService.list().subscribe(j => this.jobs = j || []);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  uploadResume() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('resume', this.selectedFile);
    formData.append('candidateName', this.candidateName || '');
    if (this.selectedJobId) formData.append('jobId', this.selectedJobId);

    this.resumeService.upload(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          alert('Resume uploaded successfully');
          this.uploadedResumeId = event.body.resume._id;
          this.aiResult = null;
        }
      },
      error: () => alert('Upload failed')
    });
  }

  getAiScore() {
    if (!this.uploadedResumeId) return;
    this.resumeService.getAiScore(this.uploadedResumeId).subscribe({
      next: (res) => {
        // backend returns { result: updatedResume } - adjust if backend format differs
        this.aiResult = res.result || res;
      },
      error: () => alert('AI scoring failed')
    });
  }
}
