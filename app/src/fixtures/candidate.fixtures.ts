import { Candidate, CandidateForm } from '../candidate';

const mockCandidates: Candidate[] = [
  { name: 'Name1', surname: 'Surname1', seniority: 'senior', years: 3, availability: true },
];

const mockCandidateForm: CandidateForm = {
  name: 'Name1',
  surname: 'Surname1',
  file: new File(['content'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
};

export { mockCandidateForm, mockCandidates}