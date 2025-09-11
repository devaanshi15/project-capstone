import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job, this.getHeaders());
  }

  update(id: string, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, job, this.getHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // ✅ NEW METHOD
  recommend(jobId: string, topN: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${jobId}/recommend?top=${topN}`,
      this.getHeaders()
    );
  }
}
