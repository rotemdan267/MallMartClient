import { TestBed } from '@angular/core/testing';

import { ServerAddressService } from './server-address.service';

describe('ServerAddressService', () => {
  let service: ServerAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
