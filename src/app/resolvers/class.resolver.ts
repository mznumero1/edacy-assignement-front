import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Class } from '../models/class';
import { ClassService } from '../services/class.service';

@Injectable({
  providedIn: 'root'
})
export class ClassResolver implements Resolve<Class> {
  constructor(
    private service: ClassService,
    private router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Class> {
    const id = route.paramMap.get('id') || '';
    const obs = this.service.findById(id);
    obs.subscribe({
      next: () => {},
      error: (err) => {
        console.log('error getting class with resolver', err);
        this.router.navigate(['classes']);
      }
    });
    return obs;
  }
}
