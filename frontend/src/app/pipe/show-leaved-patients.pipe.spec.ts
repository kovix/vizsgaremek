import { ShowLeavedPatientsPipe } from './show-leaved-patients.pipe';

describe('ShowLeavedPatientsPipe', () => {
  it('create an instance', () => {
    const pipe = new ShowLeavedPatientsPipe();
    expect(pipe).toBeTruthy();
  });
});
