import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:5000/api/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${API}/upload`, formData, { reportProgress: true, observe: 'events' });
  }

  getAiScore(resumeId: string) {
    return this.http.post<any>(`${API}/ai-score/${resumeId}`, {});
  }
}
