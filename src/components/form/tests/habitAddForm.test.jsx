import React from 'react';

import { render, screen } from "@testing-library/react";

import HabitAddForm from "../habitAddForm";
import userEvent from '@testing-library/user-event';

describe('HabitAddForm', () => {
  let handleAdd
  let input
  let button

  beforeEach(() => {
    handleAdd = jest.fn();

    render(<HabitAddForm onAdd={handleAdd}/>);

    input = screen.getByRole('textbox')
    button = screen.getByRole('button', { name: 'Add'})
  })

  it('renders input, button', () => {
    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
  });

  it('listens submit event', () => {
    userEvent.type(input, '아무것도 안하기');
    expect(input.value).toBe('아무것도 안하기');

    // fireEvent를 사용하면 클릭할때 실제로 포커스도 되지 않는다.
    // userEvent를 사용하면 실제로 사용자가 클릭하는 효과를 얻어낼 수 있다.
    userEvent.click(button);

    expect(handleAdd).toBeCalledTimes(1);
    expect(handleAdd).toBeCalledWith('아무것도 안하기');
    expect(screen.getByRole('textbox').value).toBe('');
  })

  it('doesn\'t listens submit event when input\'s value is none', () => {
    userEvent.type(input, '');
    userEvent.click(button);

    expect(handleAdd).toBeCalledTimes(0);
  })
});