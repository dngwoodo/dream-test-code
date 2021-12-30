import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import './app.css';
import Habits from '../components/habits/habits';
import Navbar from '../components/navbar/navbar';

const App = ({ presenter }) => {
  const [habits, setHabits] = useState(presenter.getHabits());

  const handleIncrement = useCallback(habit => {
    presenter.increment(habit, setHabits);
  }, [presenter]);

  const handleDecrement = useCallback(habit => {
    presenter.decrement(habit, setHabits);
  }, [presenter]);

  const handleDelete = useCallback(habit => {
    presenter.delete(habit, setHabits);
  }, [presenter]);

  const handleAdd = useCallback(name => {
    presenter.add(name, setHabits);
  }, [presenter]);

  const handleReset = useCallback(() => {
    presenter.reset(setHabits);
  }, [presenter]);

  return (
    <>
      <Navbar totalCount={habits.filter(item => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  );
};

export default App;
