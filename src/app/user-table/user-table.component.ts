import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IStudent } from '../models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass']
})
export class UserTableComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  sortName: string | null = null;
  sortValue: string | null = null;
  listOfGroups = [{ text: '123', value: '123' }, { text: 'Ozzy', value: 'Ozzy' }]; // Подгружать группы с сервера
  listOfSearchName: string[] = [];
  listOfData: Array<IStudent> = [];
  listOfDisplayData: Array<IStudent> = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {

    this.studentService.getStudents$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.listOfData = data;
        this.listOfDisplayData = [...this.listOfData];
      });

  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[]): void {
    this.listOfSearchName = listOfSearchName;
    this.search();
  }

  search(): void {
    /* filter data */
    const filterFunc = (item: IStudent) =>
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.firstName.indexOf(name) !== -1) : true);

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
