import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { IStudent, ITeacher } from 'src/app/models';
import { Observable } from 'rxjs';
import { StudentService, TeacherService } from 'src/app/services';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.sass']
})
export class AddEditContactComponent implements OnInit {

  @Input() role: 'student' | 'teacher';
  @Input() user: any;

  addEditContactForm: FormGroup;
  formValueMaxLength = 50;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.addEditContactForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [ Validators.required, Validators.maxLength(this.formValueMaxLength) ]
      ],
      lastName: [
        this.user.lastName,
        [ Validators.required, Validators.maxLength(this.formValueMaxLength) ]
      ],
      patronymic: [
        this.user.patronymic,
        [ Validators.required, Validators.maxLength(this.formValueMaxLength) ]
      ]
    });
    console.log(this.role);
    console.log(this.user);
  }

  destroyModal(contact?: any, instant?: boolean, error?: Error): void {
    this.modal.destroy();
  }

  submitForm(): void {
    if (this.role === 'student') {
      // tslint:disable-next-line:prefer-const
      let student: IStudent = this.user;
      student.firstName = this.addEditContactForm.value.firstName;
      student.lastName = this.addEditContactForm.value.lastName;
      student.patronymic = this.addEditContactForm.value.patronymic;

      this.studentService.changeStudent$(student).subscribe();
    } else {
      // tslint:disable-next-line:prefer-const
      let teacher: ITeacher = this.user;
      teacher.firstName = this.addEditContactForm.value.firstName;
      teacher.lastName = this.addEditContactForm.value.lastName;
      teacher.patronymic = this.addEditContactForm.value.patronymic;

      this.teacherService.changeTeacher$(teacher).subscribe();
    }
    this.modal.destroy();
  }

}
