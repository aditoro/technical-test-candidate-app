import { Candidate, CandidateForm } from '../../candidate';

const mockCandidates: Candidate[] = [
  { name: 'Name1', surname: 'Surname1', seniority: 'senior', years: 1, availability: true },
  { name: 'Name2', surname: 'Surname2', seniority: 'junior', years: 2, availability: false },
  { name: 'Name3', surname: 'Surname3', seniority: 'senior', years: 3, availability: true },

];

const mockCandidateForm: CandidateForm = {
  name: 'Name1',
  surname: 'Surname1',
  file: new File(['content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
};

export { mockCandidateForm, mockCandidates}