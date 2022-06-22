import { TestBed } from '@angular/core/testing';

import { ClassStudentsResolver } from './class-students.resolver';

describe('ClassStudentsResolver', () => {
  let resolver: ClassStudentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClassStudentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
