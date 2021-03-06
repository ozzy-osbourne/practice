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

  changeStudent$(student: IStudent): Observable<IStudent> {
    return this.apiService.changeStudent$(student);
  }

  getStudent$(id: number): Observable<IStudent> {
    return this.apiService.getStudent$(id);
  }

  getStudents$(): Observable<IStudent[]> {
    return this.apiService.getStudents$();
  }

  deleteStudent$(id: number): Observable<object> {
    return this.apiService.deleteStudent$(id);
  }

}
