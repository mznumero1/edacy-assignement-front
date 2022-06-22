import { AddStudentComponent } from './add-student/add-student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsResolver } from '../resolvers/students.resolver';
import { StudentsComponent } from './students.component';
import { StudentResolver } from '../resolvers/student.resolver';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    resolve: {
      students: StudentsResolver
    }
  },
  {
    path: 'add',
    component: AddStudentComponent
  },
  {
    path: 'edit/:id',
    component: AddStudentComponent,
    resolve: {
      student: StudentResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
