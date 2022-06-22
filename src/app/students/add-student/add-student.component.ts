import { ClassService } from './../../services/class.service';
import { Observable } from 'rxjs';
import { Class } from './../../models/class';
import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  title: string;
  edit: boolean;
  ready = false;
  form: FormGroup;
  student: Student = new Student();
  classes$: Observable<Class[]>;

  constructor(
    route: ActivatedRoute,
    private fb: FormBuilder,
    private service: StudentService,
    classService: ClassService,
    private router: Router
  ) {
    route.data.subscribe({
      next: (data: any) => {
        if (data.student) {
          this.edit = true;
          this.title = 'Mise à jour d\'Eleve';
          this.student = data.student;
        } else {
          this.edit = false;
          this.title = 'Enregistrement d\'Eleve';
        }
        this.form = this.fb.group({
          firstname: [this.student.firstname || '', [Validators.required]],
          lastname: [this.student.lastname || '', [Validators.required]],
          classId: [this.student.classId || '']
        });
      }
    });
    this.classes$ = classService.get();
  }

  ngOnInit(): void {
    this.ready = true;
  }

  submit() {
    const student: Student = this.form.value;
    if (this.edit) {
      this.service.update(this.student.id, student).subscribe({
        next: () => {
          alert('Informations mises à jour');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.log('error updating student', err);
          alert('Erreur de mise à jour');
        }
      });
    } else {
      this.service.add(student).subscribe({
        next: () => {
          alert('Informations enregistrés');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.log('error adding student', err);
          alert('Erreur d\'Enregistrement');
        }
      });
    }
  }

}
