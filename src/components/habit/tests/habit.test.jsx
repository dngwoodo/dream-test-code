import React from 'react';

import { render, screen } from "@testing-library/react";

import userEvent from '@testing-library/user-event';

import renderer from 'react-test-renderer';

import Habit from "../Habit";

describe('Habit', () => {
  const HABIT = { id: 1, name: 'Reading', count: 0 };
  let handleIncrement;
  let handleDecrement;
  let handleDelete;

  beforeEach(() => {
    handleIncrement = jest.fn();
    handleDecrement = jest.fn();
    handleDelete = jest.fn();
  })

  it('renders', () => {
    const component = renderer.create(
      <Habit 
        habit={HABIT}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
      />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('event', () => {
    let incrementButton;
    let decrementButton;
    let deleteButton;

    function renderHabit(habit) {
      return render(
       <Habit 
          habit={habit}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      )
    }

    beforeEach(() => {
      renderHabit(HABIT);

      [incrementButton, decrementButton, deleteButton] = screen.getAllByRole('button');
    })

    it('listens increment button click event', () => {
      expect(handleIncrement).toBeCalledTimes(0);

      userEvent.click(incrementButton);

      expect(handleIncrement).toBeCalledTimes(1);
    })

    it('listens decrement button click event', () => {
      expect(handleIncrement).toBeCalledTimes(0);

      userEvent.click(decrementButton);

      expect(handleDecrement).toBeCalledTimes(1);
    })

    it('listens delete button click event', () => {
      expect(handleIncrement).toBeCalledTimes(0);

      userEvent.click(deleteButton);

      expect(handleDelete).toBeCalledTimes(1);
    })
  })
});