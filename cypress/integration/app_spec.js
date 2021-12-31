/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

describe('Habit Tracker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Habit Tracker').should('exist');
  });

  it('adds new habit at the end', () => {
    cy.findByPlaceholderText('Habit').type('New Habit');
    cy.findByText('Add').click();
    cy.findAllByTestId('habit-name').last().should('have.text', 'New Habit');
    cy.findAllByTestId('habit-count').last().should('have.text', '0');
  })

  it('increases count', () => {
    cy.findAllByTitle('increment').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '1');
  })

  it('decreases count', () => {
    cy.findAllByTitle('increment').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '1');
    cy.findAllByTitle('decrement').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('does not decrease below 0', () => {
    cy.findAllByTitle('decrement').first().click();
    cy.findAllByTestId('habit-count').first().should('have.text', '0');
  });

  it('shows active count on the header', () => {
    cy.findAllByTitle('increment').first().click();
    cy.findAllByTitle('increment').last().click();
    cy.findByTestId('total-count').should('have.text', 2);

    cy.findAllByTitle('increment').first().click();
    cy.findAllByTitle('decrement').last().click();
    cy.findByTestId('total-count').should('have.text', 1);
  });

  it('deletes an item', () => {
    cy.findAllByTitle('delete').first().click();
    cy.findAllByTestId('habit-name').findByText('Reading').should('not.exist');
  });

  it('resets to 0 when clicking reset all', () => {
    cy.findAllByTitle('increment').first().click();
    cy.findAllByTitle('increment').last().click();
    cy.findByText('Reset All').click();


    cy.findAllByTestId('habit-count').each(item => {
      cy.wrap(item).should('have.text', '0');
    });
  });
});