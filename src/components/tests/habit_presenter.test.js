import HabitPresenter from "../habit_presenter";

import getId from '../../utils/getId';

jest.mock('../../utils/getId');

const HABITS = [
  { id: 1, name: 'Reading', count: 0 },
  { id: 2, name: 'Running', count: 0 },
  { id: 3, name: 'Coding', count: 1 },
];

describe('HabitPresenter', () => {
  let update;
  let habitPresenter;
  
  beforeEach(() => {
    getId.mockImplementation(() => 100);
    
    update = jest.fn();
    habitPresenter = new HabitPresenter(HABITS);
  })

  it('inits habits', () => {
    const habits = habitPresenter.getHabits();

    expect(habits).toEqual(HABITS);
  });

  it('increments habit count and calls update', () => {
    habitPresenter.increment(HABITS[0], update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual( [
      { id: 1, name: 'Reading', count: 1 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });

  it('decrements habit count and calls update', () => {
    habitPresenter.decrement(HABITS[2], update);

    expect(habitPresenter.getHabits()[2].count).toBe(0);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });

  // "테스트를 의도적으로 실패할 수 있는지를 체크하자"!!
  it('doesn\'t set count value below 0 when decrements', () => {
    habitPresenter.decrement(HABITS[0], update);

    expect(habitPresenter.getHabits()[0].count).toEqual(0);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });

  it('delete habit and calls update', () => {
    habitPresenter.delete(HABITS[0], update);
    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });

  it('add habit and calls update', () => {
    habitPresenter.add('xxx', update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([...HABITS, { id: 100, name: 'xxx', count: 0}]);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });

  it('reset habit\'s count and calls update', () => {
    habitPresenter.reset(update);

    const habits = habitPresenter.getHabits();

    expect(habits).toEqual([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 0 },
    ]);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  });
});