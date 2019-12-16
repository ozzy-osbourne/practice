import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { StudentService, TeacherService } from '../services';
import { IStudent, ITeacher } from '../models';
import { setItem } from '../services/utils/lsFunctions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  students: IStudent[];
  teachers: ITeacher[];

  isValid = false; // переделать под валидацию

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.value.role === 'student') {
      setItem('role', 'student');
    } else {
      setItem('role', 'teacher');
    }

    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem('role')));

    this.studentService.getStudents$().subscribe(data => {
      this.students = data;
    });

    this.teacherService.getTeachers$().subscribe(data => {
      this.teachers = data;
    });

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: ['student', [Validators.required]],
      remember: [true]
    });

    this.onValueChanges();
  }

  onValueChanges(): void {
    this.validateForm.valueChanges.subscribe(val => {

      if (val.role === 'student') {
        this.students.some(item => {
          this.isValid = val.userName === item.login && val.password === item.password;
        });
      } else {
        this.teachers.some(item => {
          this.isValid = val.userName === item.login && val.password === item.password;
        });
      }

    });
  }

}
