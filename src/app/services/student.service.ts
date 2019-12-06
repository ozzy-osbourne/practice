import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IStudent } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiService: ApiService) { }

  getStudents$(): Observable<IStudent[]> {
    return this.apiService.getStudents$();
  }

  addStudent$(student: IStudent): Observable<IStudent> {
    return this.apiService.addStudent$(student);
  }

}
