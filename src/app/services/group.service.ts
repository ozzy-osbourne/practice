import { Injectable } from '@angular/core';
import { ApiService } from '.';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private apiService: ApiService) { }

  getGroups$(): Observable<string[]> {
    return this.apiService.getGroups$();
  }

}
