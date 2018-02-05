import { TestBed, inject } from '@angular/core/testing';

import { SocketSerService } from './socket-ser.service';

describe('SocketSerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketSerService]
    });
  });

  it('should be created', inject([SocketSerService], (service: SocketSerService) => {
    expect(service).toBeTruthy();
  }));
});
