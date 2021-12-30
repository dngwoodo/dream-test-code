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

  describe('Button Click', () => {
    beforeEach(() => {
      render(
        <Habit 
           habit={HABIT}
           onIncrement={handleIncrement}
           onDecrement={handleDecrement}
           onDelete={handleDelete}
         />
       )
    })

    it('listens increment button click event', () => {
      expect(handleIncrement).toBeCalledTimes(0);

      userEvent.click(screen.getByTitle('increment'));

      expect(handleIncrement).toBeCalledTimes(1);
      expect(handleIncrement).toBeCalledWith(HABIT);
    })

    it('listens decrement button click event', () => {
      expect(handleDecrement).toBeCalledTimes(0);

      userEvent.click(screen.getByTitle('decrement'));

      expect(handleDecrement).toBeCalledTimes(1);
      expect(handleDecrement).toBeCalledWith(HABIT);
    })

    it('listens delete button click event', () => {
      expect(handleDelete).toBeCalledTimes(0);

      userEvent.click(screen.getByTitle('delete'));

      expect(handleDelete).toBeCalledTimes(1);
      expect(handleDelete).toBeCalledWith(HABIT);
    })
  })
});