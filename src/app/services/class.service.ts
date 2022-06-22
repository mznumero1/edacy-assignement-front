import { StudentService } from './student.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: Class[] = [];
  constructor(
  ) { }

  add(data: Class): Observable<Class> {
    data.id = String(this.classes.length + 1);
    this.classes.push(data);
    return of(data);
  }

  update(id: string, data: Class): Observable<Class> {
    data.id = id;
    const index = this.classes.findIndex((val) => val.id === id);
    if (index >= 0) {
      this.classes[index] = data;
    }
    return of(data);
  }

  delete(id: string): Observable<boolean> {
    const index = this.classes.findIndex((val) => val.id === id);
    if (index >= 0) {
      this.classes.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  findById(id: string): Observable<Class> {
    const res = this.classes.find((val) => val.id === id);
    return of(res || new Class());
  }

  get(): Observable<Class[]> {
    return of(this.classes);
  }
}
