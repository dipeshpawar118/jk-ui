import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import CreatePost from './CreatePost';
import * as apiService from '../utlis/api.serive';

jest.mock('../utlis/api.serive');

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <Router>{ui}</Router>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('CreatePost Component', () => {
  it('should create a new post and navigate to the dashboard', async () => {
    const providerProps = {
      value: {
        login: jest.fn(),
      },
    };

    apiService.post.mockResolvedValue({ status: 201 });

    const { getByLabelText, getByText } = renderWithProviders(<CreatePost />, { providerProps });

    fireEvent.change(getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText(/content/i), { target: { value: 'Test Content' } });

    fireEvent.click(getByText(/Save/i));

    await waitFor(() => {
      expect(apiService.post).toHaveBeenCalledWith('posts', {
        title: 'Test Title',
        content: 'Test Content',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/user/dashboard');
    });
  });
});