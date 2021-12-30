import React from 'react';

import { fireEvent, render, screen } from "@testing-library/react";

import HabitAddForm from "../habitAddForm";

describe('HabitAddForm', () => {
  let handleAdd

  beforeEach(() => {
    handleAdd = jest.fn();

    render(<HabitAddForm onAdd={handleAdd}/>);
  })

  it('renders input, button', () => {
    expect(screen.getByRole('textbox')).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Add'})).not.toBeNull();
  });

  it('listens submit event', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '아무것도 안하기'}});
    expect(screen.getByRole('textbox').value).toBe('아무것도 안하기');

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(handleAdd).toBeCalledTimes(1);
    expect(handleAdd).toBeCalledWith('아무것도 안하기');
    expect(screen.getByRole('textbox').value).toBe('');
  })

  it('doesn\'t submit event when input\'s value is none', () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: ''}});
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(handleAdd).not.toBeCalled();
  })
});