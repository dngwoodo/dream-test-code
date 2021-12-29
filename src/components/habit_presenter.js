import getId from "../utils/getId";

// 비지니스 로직을 App.jsx에서 관리하는 것이 아니라 여기서 관리하게 된다.
export default class HabitPresenter {
  constructor(habits) {
    this.habits = habits;
  }

  getHabits(){
    return this.habits;
  }

  increment(habit, update) {
    this.habits = this.habits.map(item => {
      if(item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }

      return item;
    });

    update(this.habits);
  }

  decrement(habit, update) {
    this.habits = this.habits.map(item => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }

      return item;
    });

    update(this.habits);
  }

  delete(habit, update){
    this.habits = this.habits.filter(item => item.id !== habit.id);

    update(this.habits)
  }

  add(name, update) {
    this.habits = [...this.habits, { id: getId(), name, count: 0 }];

    update(this.habits);
  }

  reset(update) {
    this.habits = this.habits.map(habit => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }

      return habit;
    });

    update(this.habits)
  }
}