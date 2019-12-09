import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudent, ITeacher } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http: HttpClient) { }

  // Groups
  getGroups$(): Observable<string[]> {
    return this.Http.get<string[]>('http://localhost:3000/groups');
  }

  // Students
  addStudent$(student: IStudent): Observable<IStudent> {
    return this.Http.post<IStudent>('http://localhost:3000/students', student);
  }

  changeStudent$(student: IStudent): Observable<IStudent> {
    return this.Http.put<IStudent>(`http://localhost:3000/students/${student.id}`, student);
  }

  getStudent$(id: number): Observable<IStudent> {
    return this.Http.get<IStudent>(`http://localhost:3000/students/${id}`);
  }

  getStudents$(): Observable<IStudent[]> {
    return this.Http.get<IStudent[]>('http://localhost:3000/students');
  }

  deleteStudent$(id: number): Observable<object> {
    return this.Http.delete<object>(`http://localhost:3000/students/${id}`);
  }

  // Teacher
  getTeachers$(): Observable<ITeacher[]> {
    return this.Http.get<ITeacher[]>('http://localhost:3000/teachers');
  }

  getTeacher$(id: number): Observable<ITeacher> {
    return this.Http.get<ITeacher>(`http://localhost:3000/teachers/${id}`);
  }

  deleteTeacher$(id: number): Observable<object> {
    return this.Http.delete<object>(`http://localhost:3000/teachers/${id}`);
  }

}
