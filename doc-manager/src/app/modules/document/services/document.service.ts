
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  //private apiUrl = 'https://localhost:7217/api/Document'; // Replace with your actual API URL
  private apiUrl = environment.apiUrl; // Replace with your actual API URL
 // constructor(private http: HttpClient) {}
  constructor(private http: HttpClient) {
    this.http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      responseType: 'json',
      withCredentials: true,
      observe: 'response'
    });
  }
  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  getDocumentById(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  
  addDocument(doc: Document): Observable<Document> {    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<Document>(this.apiUrl, JSON.stringify(doc), { headers });
  }

  deleteDocument(id: string): Observable<void> {
    debugger;
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
