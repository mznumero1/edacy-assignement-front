import { Student } from './../../models/student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/services/class.service';
import { MatTable } from '@angular/material/table';

@Component({
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  title: string;
  edit: boolean;
  ready = false;
  form: FormGroup;
  classe: Class = new Class();
  students: Student[] = [];
  displayedColumns: string[] = ['firstname', 'lastname'];
  dataSource = [];

  @ViewChild('table') table: MatTable<Student> | null;

  constructor(
    route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ClassService,
    private router: Router
  ) {
    route.data.subscribe({
      next: (data: any) => {
        if (data.class) {
          this.edit = true;
          this.title = 'Mise à jour de Classe';
          this.classe = data.class;
          this.students = data.students;
          this.dataSource = data.students;
          console.log('students', data.students);
          this.table?.renderRows();
        } else {
          this.edit = false;
          this.title = 'Enregistrement de Classe';
        }
        this.form = this.fb.group({
          name: [this.classe.name || '', [Validators.required]],
        });
      }
    });
  }

  ngOnInit(): void {
    this.ready = true;
  }

  submit() {
    const classe: Class = this.form.value;
    if (this.edit) {
      this.service.update(this.classe.id, classe).subscribe({
        next: () => {
          alert('Informations mises à jour');
          this.router.navigate(['/classes']);
        },
        error: (err) => {
          console.log('error updating class', err);
          alert('Erreur de mise à jour');
        }
      });
    } else {
      this.service.add(classe).subscribe({
        next: () => {
          alert('Informations enregistrés');
          this.router.navigate(['/classes']);
        },
        error: (err) => {
          console.log('error adding class', err);
          alert('Erreur d\'Enregistrement');
        }
      });
    }
  }

}
