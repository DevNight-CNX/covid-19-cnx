import { TestScheduler } from 'rxjs/testing';

const testMarble = fn => () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(helpers => {
    fn(helpers);
  });
};

export default testMarble;
