import React from 'react';

import { render, screen } from "@testing-library/react";

import userEvent from '@testing-library/user-event';

import renderer from 'react-test-renderer';

import Habits from "../habits";

describe('Habits', () => {
  const HABITS = [
    { id: 1, name: 'Reading', count: 0 },
    { id: 2, name: 'Running', count: 0 },
    { id: 3, name: 'Coding', count: 0 },
  ];
  let handleIncrement;
  let handleDecrement;
  let handleDelete;
  let handleReset;
  

  function renderHabits(habits) {
    return render(
     <Habits 
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onReset={handleReset}
      />
    )
  }

  beforeEach(() => {
    handleIncrement = jest.fn();
    handleDecrement = jest.fn();
    handleDelete = jest.fn();
    handleReset = jest.fn();
  })

  it('renders', () => {
    const component = renderer.create(
      <Habits 
        habits={HABITS}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onReset={handleReset}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('listens click event', () => {
    renderHabits(HABITS);

    userEvent.click(screen.getByRole('button', {name: 'Reset All'}));

    expect(handleReset).toBeCalledTimes(1);
  })
});