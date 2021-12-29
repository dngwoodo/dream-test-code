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

  function checkUpdateIsCalled() {
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(habitPresenter.getHabits());
  }
  
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
    checkUpdateIsCalled();
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
    checkUpdateIsCalled();
  });

  it('delete habit and calls update', () => {
    habitPresenter.delete(HABITS[0], update);

    expect(habitPresenter.getHabits()).toHaveLength(2);
    expect(habitPresenter.getHabits()).toEqual([
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
    checkUpdateIsCalled();
  });

  it('add new habit and calls update', () => {
    habitPresenter.add('xxx', update);

    expect(habitPresenter.getHabits()).toHaveLength(4);
    expect(habitPresenter.getHabits()).toEqual([...HABITS, { id: 100, name: 'xxx', count: 0 }]);
    checkUpdateIsCalled();
  });

  describe('reset', () => {
    it('reset habit\'s count and calls update', () => {
      habitPresenter.reset(update);
  
      expect(habitPresenter.getHabits()[0].count).toBe(0);
      expect(habitPresenter.getHabits()[1].count).toBe(0);
      expect(habitPresenter.getHabits()[2].count).toBe(0);
      checkUpdateIsCalled();
    });

    // 이 로직은 강제하고 싶기 때문에 별도로 테스트코드를 작성한다.
    it('doesn\'t create new object when count is 0', () => {
      const habits = habitPresenter.getHabits();
      habitPresenter.reset(update);
      const updateHabits = habitPresenter.getHabits();

      // toBe는 참조가 다르면 fail이 뜬다.
      // toEqual은 참조가 달라도 값이 같으면 success가 뜬다. 즉 오브젝트의 값을 체크한다.
      expect(updateHabits[1]).toBe(habits[1]);
      expect(updateHabits[1]).toEqual(habits[1]);
    });
  })
});