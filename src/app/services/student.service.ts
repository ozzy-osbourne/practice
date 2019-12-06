import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IStudent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: ApiService) { }

  addStudent$(student: IStudent): Observable<IStudent> {
    return this.apiService.addStudent$(student);
  }

  getStudent$(id: number): Observable<IStudent> {
    return this.apiService.getStudent$(id);
  }

  getStudents$(): Observable<IStudent[]> {
    return this.apiService.getStudents$();
  }

}
