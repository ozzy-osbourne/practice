import { Injectable } from '@angular/core';
import { getItem } from './utils/lsFunctions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles: string[] = ['student', 'teacher', 'adnin'];
  role = 'role';

  constructor() { }

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
