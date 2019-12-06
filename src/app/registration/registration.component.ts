import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IStudent } from '../models';
import { StudentService } from '../services';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  validateForm: FormGroup;

  students: IStudent[];
  student: IStudent;

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

    this.student = {
      id: this.students[this.students.length - 1].id + 1, // Проверка id из-за отсутствия проверки на сервере
      firstName: this.validateForm.value.firstName,
      lastName: this.validateForm.value.lastName,
      patronymic: this.validateForm.value.patronymic,
      login: this.validateForm.value.login,
      password: this.validateForm.value.password,
      group: 'A1',
      role: 'student',
      subjects: ['Математика', 'Английский', 'Информатика'],
    };

    this.studentService.addStudent$(this.student)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.router.navigate(['/login']);
      });

    // this.router.navigate(['/login']);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      patronymic: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });

    this.studentService.getStudents$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.students = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
