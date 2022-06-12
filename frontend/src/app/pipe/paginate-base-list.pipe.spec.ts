import { PaginateBaseListPipe } from './paginate-base-list.pipe';

describe('PaginateBaseListPipe', () => {
  it('create an instance', () => {
    const pipe = new PaginateBaseListPipe();
    expect(pipe).toBeTruthy();
  });
});
