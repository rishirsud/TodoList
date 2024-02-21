import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GoalInput from '../src/components/GoalInput';

describe('GoalInput', () => {
  const mockOnAddGoal = jest.fn();
  const mockOnCancel = jest.fn();

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <GoalInput visible={true} onAddGoal={mockOnAddGoal} onCancel={mockOnCancel} />
    );

    expect(getByPlaceholderText('Goal Title')).toBeTruthy();
    expect(getByPlaceholderText('Deadline (MM-DD-YYYY)')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
  });

  it('calls the onAddGoal function when the Add Goal button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <GoalInput visible={true} onAddGoal={mockOnAddGoal} onCancel={mockOnCancel} />
    );

    fireEvent.changeText(getByPlaceholderText('Goal Title'), 'New Goal');
    fireEvent.changeText(getByPlaceholderText('Deadline (MM-DD-YYYY)'), '12-31-2022');
    fireEvent.changeText(getByPlaceholderText('Description'), 'New Description');
    fireEvent.press(getByText('Add Goal'));

    expect(mockOnAddGoal).toHaveBeenCalled();
  });

  it('calls the onCancel function when the Cancel button is pressed', () => {
    const { getByText } = render(
      <GoalInput visible={true} onAddGoal={mockOnAddGoal} onCancel={mockOnCancel} />
    );

    fireEvent.press(getByText('Cancel'));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});