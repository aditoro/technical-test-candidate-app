import { TestBed } from '@angular/core/testing';
import { HomeComponent } from '../app/home/home.component';
import { CandidateService } from '../app/candidate.service';
import { CandidateListComponent } from '../app/components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from '../app/components/candidate-form/candidate-form.component';
import { MatButtonModule } from '@angular/material/button';
import { mockCandidates } from './fixtures/candidate.fixtures'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let candidateServiceMock: jest.Mocked<CandidateService>;

  beforeEach(() => {
    candidateServiceMock = {
      getCandidates: jest.fn(() => () => mockCandidates), // Mock signal()
      fetchAllCandidates: jest.fn(() => Promise.resolve(mockCandidates)), // Mock service fetch
    } as unknown as jest.Mocked<CandidateService>;

    TestBed.configureTestingModule({
      imports: [HomeComponent, CandidateListComponent, CandidateFormComponent, MatButtonModule],
      providers: [{ provide: CandidateService, useValue: candidateServiceMock }]
    });

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchAllCandidates on init', () => {
    expect(candidateServiceMock.fetchAllCandidates).toHaveBeenCalled();
  });

  it('should open the form when openForm() is called', () => {
    component.openForm();
    expect(component.isFormOpen()).toBe(true);
  });

  it('should close the form when closeForm() is called', () => {
    component.openForm();
    component.closeForm();
    expect(component.isFormOpen()).toBe(false);
  });
});
