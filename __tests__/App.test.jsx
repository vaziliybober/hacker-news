import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from '../src/components/App.jsx';

test('app', () => {
  render(<App />);
  const textElement = screen.getByText(/Hacker News/i);
  expect(textElement).toBeInTheDocument();
});
