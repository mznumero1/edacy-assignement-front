import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root'
})
export class ClassStudentsResolver implements Resolve<Student[]> {
  constructor(
    private service: StudentService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student[]> {
    const id = route.paramMap.get('id') || '';
    return this.service.getByClass(id);
  }
}
