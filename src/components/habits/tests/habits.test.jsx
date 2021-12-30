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
  let handleAdd;
  let handleReset;

  function renderHabits(habits) {
    return render(
     <Habits 
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    )
  }

  beforeEach(() => {
    handleIncrement = jest.fn();
    handleDecrement = jest.fn();
    handleDelete = jest.fn();
    handleAdd = jest.fn();
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

  describe('Button Click', () => {
    beforeEach(() => {
      renderHabits(HABITS);
    })

    it('listens submit event', () => {
      userEvent.type(screen.getByRole('textbox'), '아무것도 안하기');
      expect(screen.getByRole('textbox').value).toBe('아무것도 안하기');
  
      // fireEvent를 사용하면 클릭할때 실제로 포커스도 되지 않는다.
      // userEvent를 사용하면 실제로 사용자가 클릭하는 효과를 얻어낼 수 있다.
      userEvent.click(screen.getByRole('button', { name: 'Add'}));
  
      expect(handleAdd).toBeCalledTimes(1);
      expect(handleAdd).toBeCalledWith('아무것도 안하기');
      expect(screen.getByRole('textbox').value).toBe('');
    })
  
    it('doesn\'t listens submit event when input\'s value is none', () => {
      userEvent.type(screen.getByRole('textbox'), '');
      userEvent.click(screen.getByRole('button', { name: 'Add'}));
  
      expect(handleAdd).toBeCalledTimes(0);
    })

    it('listens increment button click event', () => {
      expect(handleIncrement).toBeCalledTimes(0);

      userEvent.click(screen.getAllByTitle('increment')[0]);

      expect(handleIncrement).toBeCalledTimes(1);
      expect(handleIncrement).toBeCalledWith(HABITS[0]);
    })

    it('listens decrement button click event', () => {
      expect(handleDecrement).toBeCalledTimes(0);

      userEvent.click(screen.getAllByTitle('decrement')[0]);

      expect(handleDecrement).toBeCalledTimes(1);
      expect(handleDecrement).toBeCalledWith(HABITS[0]);
    })

    it('listens delete button click event', () => {
      expect(handleDelete).toBeCalledTimes(0);

      userEvent.click(screen.getAllByTitle('delete')[0]);

      expect(handleDelete).toBeCalledTimes(1);
      expect(handleDelete).toBeCalledWith(HABITS[0]);
    })

    it('listens reset click event', () => {
      expect(handleDelete).toBeCalledTimes(0);
      
      userEvent.click(screen.getByRole('button', {name: 'Reset All'}));
  
      expect(handleReset).toBeCalledTimes(1);
    })
  })
});