import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService, GroupService, TeacherService } from '../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStudent, ITeacher } from '../models';
import { Router, NavigationStart } from '@angular/router';
import { setItem } from '../services/utils/lsFunctions';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass']
})
export class UserTableComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  selectedValue = 'students';

  sortName: string | null = null;
  sortValue: string | null = null;
  listOfGroups = []; // Подгружать группы с сервера
  listOfSearchGroup: string[] = [];
  listOfData: any[] = [];
  listOfDisplayData: any[] = [];

  constructor(
    private router: Router,
    private groupService: GroupService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) { }

  ngOnInit() {

    this.studentService.getStudents$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
      });

    this.groupService.getGroups$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.listOfGroups[i] = {text: data[i], value: data[i]};
        }
      });

    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.studentService.getStudents$().subscribe(data => {
              this.listOfData = data;
              this.listOfDisplayData = [...this.listOfData];
            });
        }
      });

  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchGroup: string[]): void {
    this.listOfSearchGroup = listOfSearchGroup;
    this.search();
  }

  search(): void {
    /* filter data */
    const filterFunc = item =>
      (this.listOfSearchGroup.length ? this.listOfSearchGroup.some(name => item.group.indexOf(name) !== -1) : true);

    const data = this.listOfData.filter(item => filterFunc(item));

    /* sort data */
    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          // tslint:disable-next-line:no-non-null-assertion
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          // tslint:disable-next-line:no-non-null-assertion
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.listOfDisplayData = data;
    }
  }

  provinceChange(value: string): void {
    if (value === 'students') {
      this.studentService.getStudents$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
      });
    } else {
      this.teacherService.getTeachers$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
      });
    }
  }

  exit(): void {
    setItem('role', '');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
