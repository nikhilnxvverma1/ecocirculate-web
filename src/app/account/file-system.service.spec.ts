/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileSystemService } from './file-system.service';

describe('FileSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileSystemService]
    });
  });

  it('should ...', inject([FileSystemService], (service: FileSystemService) => {
    expect(service).toBeTruthy();
  }));
});
