import React from 'react';

import { render, screen } from "@testing-library/react";

import HabitAddForm from "../habitAddForm";
import userEvent from '@testing-library/user-event';

import renderer from 'react-test-renderer'

describe('HabitAddForm', () => {
  it('renders' , () => {
    // 스냅샷 테스트를 하면 컴포넌트가 dom요소로 변경되었을 때 어떻게 보여지는지를 확인할 수 있다.
    // ../__snapshots__에 가보면 확인할 수 있다.
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);

    expect(component.toJSON()).toMatchSnapshot();
    // console.log(component.toJSON())
    // {
    //   type: 'form',
    //   props: { className: 'add-form', onSubmit: [Function: onSubmit] },
    //   children: [
    //     { type: 'input', props: [Object], children: null },
    //     { type: 'button', props: [Object], children: [Array] }
    //   ]
    // }
    // 스냅샷 결과를 변경하고 싶다면 `npm run test -- -U` 를 치면 된다.
    // https://jestjs.io/docs/snapshot-testing 참고
    // https://www.daleseo.com/jest-snapshot/ 참고
  });

  // it('renders input, button', () => {
  //   expect(input).not.toBeNull();
  //   expect(button).not.toBeNull();
  // });


  describe('Form Submit', () => {
    let handleAdd
    let input
    let button

    beforeEach(() => {
      handleAdd = jest.fn();

      render(<HabitAddForm onAdd={handleAdd}/>);

      input = screen.getByRole('textbox')
      button = screen.getByRole('button', { name: 'Add'})
    })
  
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
  })
});