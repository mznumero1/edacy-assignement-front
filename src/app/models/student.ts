import { Class } from "./class";

export class Student {
  id = '';
  firstname = '';
  lastname = '';
  classId = '';
  class: Class = new Class();
}
