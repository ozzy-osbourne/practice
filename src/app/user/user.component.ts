import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IStudent, ISubject } from '../models';
import { StudentService } from '../services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  id: number;
  inputMark: number;
  index1: number;
  index2: number;
  student: IStudent;
  subjects: ISubject[];
  days: number[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.studentService.getStudent$(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.student = data;
        this.subjects = data.subjects;
        this.days = [0, 1, 2, 3, 4];
        console.log(data);
      });
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

  deleteStudent(): void {
    this.studentService.deleteStudent$(this.student.id)
      .subscribe();
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
