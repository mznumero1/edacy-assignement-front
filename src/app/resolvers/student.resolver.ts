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
export class StudentResolver implements Resolve<Student> {
  constructor(
    private service: StudentService,
    private router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> {
    const id = route.paramMap.get('id') || '';
    const obs = this.service.findById(id);
    obs.subscribe({
      next: () => {},
      error: (err) => {
        console.log('error getting student with resolver', err);
        this.router.navigate(['students']);
      }
    });
    return obs;
  }
}
