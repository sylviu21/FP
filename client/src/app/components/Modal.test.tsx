import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const mockTitle = 'Test Modal Title';
  const mockChildren = <div>Test Modal Content</div>;

  it('should render Modal component with title and content', () => {
    render(
      <Modal onClose={mockOnClose} title={mockTitle}>
        {mockChildren}
      </Modal>
    );

    const modalTitle = screen.getByText(mockTitle);
    const modalContent = screen.getByText('Test Modal Content');

    expect(modalTitle).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal onClose={mockOnClose} title={mockTitle}>
        {mockChildren}
      </Modal>
    );

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
