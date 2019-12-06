import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http: HttpClient) { }

  getStudents$(): Observable<IStudent[]> {
    return this.Http.get<IStudent[]>('http://localhost:3000/students');
  }

  addStudent$(student: IStudent): Observable<IStudent> {
    return this.Http.post<IStudent>('http://localhost:3000/students', student);
  }

}
