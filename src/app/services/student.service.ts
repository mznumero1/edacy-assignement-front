import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Student } from '../models/student';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];
  constructor(
    private classService: ClassService
  ) { }

  add(data: Student): Observable<Student> {
    data.id = String(this.students.length + 1);
    this.students.push(data);
    return of(data);
  }

  update(id: string, data: Student): Observable<Student> {
    data.id = id;
    const index = this.students.findIndex((val) => val.id === id);
    if (index >= 0) {
      this.students[index] = data;
    }
    return of(data);
  }

  delete(id: string): Observable<boolean> {
    const index = this.students.findIndex((val) => val.id === id);
    if (index >= 0) {
      this.students.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  findById(id: string): Observable<Student> {
    return new Observable(
      observer => {
        const res = this.students.find((val) => val.id === id) || new Student();
        observer.next(res);
      }
    );
  }

  get(): Observable<Student[]> {
    return of(this.students).pipe(
      map(res => {
        res.forEach(student => {
          this.classService.findById(student.classId).subscribe({
            next: classe => {
              console.log('student', student, 'classe', classe);
              student.class = classe;
            }});
        });
        return res;
      })
    );
  }

  getByClass(classId: string): Observable<Student[]> {
    return of(this.students.filter(s => s.classId == classId));
  }
}
