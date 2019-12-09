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

}
