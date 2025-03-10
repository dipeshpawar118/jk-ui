import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthContext } from '../context/AuthContext';
import Login from './Login';

const mockLogin = jest.fn();

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Login Component', () => {
  it('should handle Google login', async () => {
    const providerProps = {
      value: {
        login: mockLogin,
      },
    };

    const { getByText } = renderWithProviders(<Login />, { providerProps });

    const googleButton = getByText(/Google/i);
    fireEvent.click(googleButton);

    // Simulate the message event from the popup
    const event = new MessageEvent('message', {
      data: { user: 'testUser', token: 'testToken' },
    });
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testUser', 'testToken');
    });
  });
});