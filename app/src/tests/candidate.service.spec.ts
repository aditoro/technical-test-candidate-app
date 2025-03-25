import { TestBed } from '@angular/core/testing';
import { CandidateService } from './../app/candidate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockCandidates, mockCandidateForm } from '../tests/fixtures/candidate.fixtures';
import { environment } from '../environments/environment';

describe('CandidateService', () => {
  let service: CandidateService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CandidateService]
    });

    service = TestBed.inject(CandidateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeDefined();
  });

  it('should fetch candidates and update the state when call fetchAllCandidates()', async () => {
    const fetchPromise = service.fetchAllCandidates();
    httpMock.expectOne({
      method: 'GET',
      url: `${apiUrl}/candidates`,
    }).flush(mockCandidates);   
    await fetchPromise;
    const candidates = service.getCandidates();
    expect(candidates()).toEqual(mockCandidates);
  });

  it('should delete candidates and update the state when call deleteCandidate()', async () => {
    service.addCandidate(mockCandidates[0])
    service.addCandidate(mockCandidates[1])
    const fetchPromise = service.deleteCandidate(mockCandidates[1]);
    httpMock.expectOne({
      method: 'DELETE',
      url: `${apiUrl}/candidates/${mockCandidates[1].id}`,
    }).flush(mockCandidates);   
    await fetchPromise;
    const candidates = service.getCandidates();
    expect(candidates()).toEqual([mockCandidates[0]]);
  });


  it('should create a new candidate and update the state when calling createCandidate()', async () => {
    const mockResponse = {
      id: 1,
      ...mockCandidates
    };

    const createCandidatePromise = service.createCandidate(mockCandidateForm);
    const req = httpMock.expectOne({
      method: 'POST',
      url: `${apiUrl}/candidates`
    });
    req.flush(mockResponse);
    await createCandidatePromise;

    const candidates = service.getCandidates();
    expect(candidates()).toHaveLength(1);
    expect(candidates()[0]).toEqual(mockResponse);
  });

  it('should handle error when createCandidate fails', async () => {
    const mockErrorResponse = {
        errors: ['Some backend error 1', 'Some backend error 2']
    };
    const createCandidatePromise = service.createCandidate(mockCandidateForm);
    const req = httpMock.expectOne({
      method: 'POST',
      url: `${apiUrl}/candidates`
    });
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });

    try {
      await createCandidatePromise;
    } catch (error) {
      expect(error).toEqual(mockErrorResponse.errors);
    }
  });

});
