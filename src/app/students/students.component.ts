import { Student } from './../models/student';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('table') table: MatTable<Student> | null;
  @Input('students') students: Student[];
  constructor(
    route: ActivatedRoute
  ) {
    route.data.subscribe({
      next: (data: any) => {
        this.dataSource = data.students;
        console.log('students', data.students);
        this.table?.renderRows();
      }
    });
  }
  displayedColumns: string[] = ['firstname', 'lastname', 'classe', 'options'];
  dataSource: Student[] = [];
  ngOnInit(): void {
    console.log('input classes', this.students);
    if (!this.dataSource || this.dataSource.length === 0) {
      this.dataSource = this.students;
      this.table?.renderRows();
    }
  }

}
