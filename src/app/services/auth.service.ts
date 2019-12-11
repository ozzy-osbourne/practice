import { Injectable } from '@angular/core';
import { getItem } from './utils/lsFunctions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles: string[] = ['student', 'teacher', 'adnin'];
  role = 'role';

  constructor() { }

  isStudent(): boolean {
    return getItem(this.role) === 'student';
  }

  isTeacher(): boolean {
    return getItem(this.role) === 'teacher';
  }

  authorized(): boolean {
    if (localStorage.getItem(this.role)) {
      if (this.roles.indexOf(getItem(this.role)) !== -1) {
        return true;
      }
      return false;
    }
    return false;
  }

}
