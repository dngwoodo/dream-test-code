import HabitPresenter from "../habit_presenter";

import getId from '../../utils/getId';

jest.mock('../../utils/getId');

const HABITS = [
  { id: 1, name: 'Reading', count: 0 },
  { id: 2, name: 'Running', count: 0 },
  { id: 3, name: 'Coding', count: 1 },
];

describe('HabitPresenter', () => {
  const update = jest.fn();
  
  let habitPresenter;

  beforeEach(() => {
    getId.mockImplementation(() => 100);

    update.mockClear();
    
    habitPresenter = new HabitPresenter(HABITS);
  })

  it('returns habits', () => {
    const habits = habitPresenter.getHabits();

    expect(habits).toEqual(HABITS);
  });

  it('increases habit count', () => {
    habitPresenter.increment(HABITS[0], update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual( [
      { id: 1, name: 'Reading', count: 1 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
    expect(update).toBeCalled();
  });

  it('decreases habit count', () => {
    habitPresenter.decrement(HABITS[2], update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual( [
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ]);
    expect(update).toBeCalled();
  });

  it('delete habit', () => {
    habitPresenter.delete(HABITS[0], update);
    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
    expect(update).toBeCalled();
  });

  it('add habit', () => {
    habitPresenter.add('xxx', update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([...HABITS, { id: 100, name: 'xxx', count: 0}]);
    expect(update).toBeCalled();
  });

  it('reset habit\'s count', () => {
    habitPresenter.reset(update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ]);
    expect(update).toBeCalled();
  });
});