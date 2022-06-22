import { StudentService } from './../services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { Student } from './../models/student';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Class } from '../models/class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  classes: Class[];
  students: Student[];
  constructor(
    classService: ClassService,
    studentService: StudentService
  ) {
    classService.get().pipe(
      map(
        classes => {
          classes.forEach(classe => {
            studentService.getByClass(classe.id).subscribe({
              next: students => classe.nbStudents = students.length
            });
          });
          return classes;
        }
      )
    ).subscribe({
      next: (classes) => {
        this.classes = classes;
        console.log('dashboard classes', classes);
      },
      error: (e) => console.log('error loading dashboard classes', e)
    });
    studentService.get().subscribe({
      next: (students) => this.students = students,
      error: (e) => console.log('error loading dashboard students', e)
    });
  }
}
