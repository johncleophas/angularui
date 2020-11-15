import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthorisationGuard } from './authorisation.guard';

describe('AuthorisationGuard', () => {
  let guard: AuthorisationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(AuthorisationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
