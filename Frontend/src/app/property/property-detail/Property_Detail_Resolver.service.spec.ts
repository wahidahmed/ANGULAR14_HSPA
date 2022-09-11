/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Property_Detail_ResolverService } from './Property_Detail_Resolver.service';

describe('Service: Property_Detail_Resolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Property_Detail_ResolverService]
    });
  });

  it('should ...', inject([Property_Detail_ResolverService], (service: Property_Detail_ResolverService) => {
    expect(service).toBeTruthy();
  }));
});
