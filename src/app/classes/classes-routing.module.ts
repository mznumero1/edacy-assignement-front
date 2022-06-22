import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassStudentsResolver } from '../resolvers/class-students.resolver';
import { ClassResolver } from '../resolvers/class.resolver';
import { ClassesResolver } from '../resolvers/classes.resolver';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassesComponent } from './classes.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    resolve: {
      classes: ClassesResolver
    }
  },
  {
    path: 'add',
    component: AddClassComponent
  },
  {
    path: 'edit/:id',
    component: AddClassComponent,
    resolve: {
      class: ClassResolver,
      students: ClassStudentsResolver
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
export class ClassesRoutingModule { }
