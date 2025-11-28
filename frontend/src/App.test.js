import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders registration page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Your real app shows the registration form by default
  expect(screen.getByText(/registration/i)).toBeInTheDocument();
  // or even more specific:
  expect(screen.getByRole('heading', { name: /registration/i })).toBeInTheDocument();
});
