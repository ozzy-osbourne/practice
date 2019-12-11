import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IStudent, ISubject, ITeacher } from '../models';
import { StudentService, TeacherService, AuthService } from '../services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  teacher: ITeacher = undefined;

  student: IStudent = undefined;
  inputMark: number;
  index1: number;
  index2: number;
  subjects: ISubject[];
  days: number[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    const role = this.route.snapshot.paramMap.get('role');
    if (role === 'student') {
      this.studentService.getStudent$(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.student = data;
        this.subjects = data.subjects;
        this.days = [0, 1, 2, 3, 4];
        console.log(data);
      });
    } else {
      this.teacherService.getTeacher$(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.teacher = data;
      });
    }
  }

  setIndexes(idx1: number, idx2: number): void {
    this.inputMark = this.subjects[idx1].marks[idx2];
    this.index1 = idx1;
    this.index2 = idx2;
  }

  // Лучше изменять оценку на обновлении формы
  updateMarks(idx1: number, idx2: number): void {
    this.student.subjects[idx1].marks[idx2] = +this.inputMark;
    console.log(this.student);
    this.studentService.changeStudent$(this.student)
      .subscribe();
    this.index1 = undefined;
    this.index2 = undefined;
  }

  deleteUser(): void {
    const role = this.route.snapshot.paramMap.get('role');
    if (role === 'student') {
      this.studentService.deleteStudent$(this.student.id)
        .subscribe();
    } else {
      this.teacherService.deleteTeacher$(this.teacher.id)
        .subscribe();
    }
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
