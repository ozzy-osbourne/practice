import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ITeacher } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private apiService: ApiService) { }

  getTeachers$(): Observable<ITeacher[]> {
    return this.apiService.getTeachers$();
  }

  getTeacher$(id: number): Observable<ITeacher> {
    return this.apiService.getTeacher$(id);
  }

  changeTeacher$(teacher: ITeacher): Observable<ITeacher> {
    return this.apiService.changeTeacher$(teacher);
  }

  deleteTeacher$(id: number): Observable<object> {
    return this.apiService.deleteTeacher$(id);
  }

}
