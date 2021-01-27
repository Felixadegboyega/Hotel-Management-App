import { TestBed } from '@angular/core/testing';

import { ProfileLinkService } from './profile-link.service';

describe('ProfileLinkService', () => {
  let service: ProfileLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
