import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';

import createApp from '../src/createApp.jsx';

nock.disableNetConnect();

test('app', () => {
  render(createApp());
  const textElement = screen.getByText(/Hacker News/i);
  expect(textElement).toBeInTheDocument();
});
