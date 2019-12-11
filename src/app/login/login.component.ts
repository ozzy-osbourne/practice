import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { StudentService } from '../services';
import { IStudent } from '../models';
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
  isValid = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    setItem('role', 'student');
    this.router.navigate(['/users']);
  }

  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem('role')));

    this.studentService.getStudents$()
    .subscribe(data => {
      this.students = data;
    });

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    this.onValueChanges();
  }

  onValueChanges(): void {
    this.validateForm.valueChanges.subscribe(val => {
      this.students.some(item => {
        this.isValid = val.userName === item.login && val.password === item.password;
      });
    });
  }

}
