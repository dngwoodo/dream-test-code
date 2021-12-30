import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import React from 'react';

import renderer from 'react-test-renderer';

import App from '../app';

import HabitPresenter from '../habit_presenter';

describe('App', () => {
  let presenter;

  beforeEach(() => {
    presenter = new HabitPresenter([
      { id: 1, name: 'Reading', count: 0 },
      { id: 2, name: 'Running', count: 0 },
      { id: 3, name: 'Coding', count: 1 },
    ]);
  });

  it('renders', () => {
    // 컴포넌트에 의존성 주입을 한다고 생각하면 된다
    // 이제 App 컴포넌트를 테스트할때 presenter를 우리가 원하는 방향으로 구현해서 넣어줄 수 있을 것 같다.
    const component = renderer.create(<App presenter={presenter} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Component', () => {
    beforeEach(() => {
      render(<App presenter={presenter} />);
    });

    it('counts only active habits', () => {
      userEvent.click(screen.getAllByTitle('increment')[0]);

      expect(screen.getByTestId('total-count').innerHTML).toBe('2');
    });

    it('adds new habit', () => {
      const newHabit = 'New Habit';

      userEvent.type(screen.getByPlaceholderText('Habit'), newHabit);
      userEvent.click(screen.getByText('Add'));

      expect(screen.getAllByTestId('habit-name')[3].innerHTML).toBe(newHabit);
      expect(screen.getAllByTestId('habit-count')[3].innerHTML).toBe('0');
    });

    it('deletes an item', () => {
      userEvent.click(screen.getAllByTitle('delete')[0]);

      expect(screen.getAllByTestId('habit-name')[0].innerHTML).not.toBe('Reading');
    });

    it('increments the counter', () => {
      userEvent.click(screen.getAllByTitle('increment')[0]);

      expect(screen.getAllByTestId('habit-count')[0].innerHTML).toBe('1');
    });

    it('decrements the counter', () => {
      userEvent.click(screen.getAllByTitle('decrement')[2]);

      expect(screen.getAllByTestId('habit-count')[2].innerHTML).toBe('0');
    });

    it('resets all counters', () => {
      userEvent.click(screen.getByText('Reset All'));

      screen.getAllByTestId('habit-count').forEach((count) => {
        expect(count.innerHTML).toBe('0');
      });
    });
  });
});
