import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../models/class';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @ViewChild('table') table: MatTable<Class> | null;
  @Input('classes') classes: Class[];
  constructor(
    route: ActivatedRoute
  ) {
    route.data.subscribe({
      next: (data: any) => {
        this.dataSource = data.classes;
        console.log('classes', data.classes);
        this.table?.renderRows();
      }
    });
  }
  displayedColumns: string[] = ['name', 'nbStudents', 'options'];
  dataSource: Class[] = [];

  ngOnInit(): void {
    console.log('input classes', this.classes);
    if (!this.dataSource || this.dataSource.length === 0) {
      this.dataSource = this.classes;
      this.table?.renderRows();
    }
  }

}
