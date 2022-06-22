import { StudentService } from './../services/student.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Class } from '../models/class';
import { ClassService } from '../services/class.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesResolver implements Resolve<Class[]> {
  constructor(
    private service: ClassService,
    private studentService: StudentService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Class[]> {
    return this.service.get().pipe(
      map(
        classes => {
          classes.forEach(classe => {
            this.studentService.getByClass(classe.id).subscribe({
              next: students => classe.nbStudents = students.length
            });
          });
          return classes;
        }
      )
    );
  }
}
