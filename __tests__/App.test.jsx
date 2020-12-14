import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';
import path from 'path';
import { promises as fsp } from 'fs';

import HackerNewsAPI from '../src/hackerNewsAPI.js';
import createApp from '../src/createApp.jsx';

nock.disableNetConnect();

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);

const fakeApi = async () => {
  const articles = JSON.parse(await fsp.readFile(getFixturePath('articles.json')));
  const comments = JSON.parse(await fsp.readFile(getFixturePath('comments.json')));
  const replies = JSON.parse(await fsp.readFile(getFixturePath('replies.json')));

  HackerNewsAPI.prototype.fetchArticles = async () => articles;

  HackerNewsAPI.prototype.fetchComments = async (ids) => comments[JSON.stringify(ids)];

  HackerNewsAPI.prototype.fetchReplies = async (ids) => replies[JSON.stringify(ids)];
};

beforeEach(async () => {
  await fakeApi();
  render(createApp());
});

test('HomePage', async () => {
  expect(screen.getByText(/Hacker News/i)).toBeInTheDocument();

  const reloadButton = screen.getByText(/Reload/i);
  expect(reloadButton).toBeInTheDocument();
  expect(reloadButton).toBeDisabled();

  const article = await screen.findByText(/Treasury breached by hackers/i);
  expect(article).toBeInTheDocument();

  expect(reloadButton).toBeEnabled();
  fireEvent.click(reloadButton);
  expect(reloadButton).toBeDisabled();
});

test('ArticlePage', async () => {
  const article = await screen.findByText(/Goodreads plans to retire/i);
  expect(article).toBeInTheDocument();
  fireEvent.click(article);

  expect(screen.getByText(/Comments/i)).toBeInTheDocument();

  const reloadButton = screen.getByText(/Reload/i);
  expect(reloadButton).toBeInTheDocument();
  expect(reloadButton).toBeDisabled();

  const comment = await screen.findByText(/I recently discovered the/i);
  expect(comment).toBeInTheDocument();
  fireEvent.click(comment);
  const reply = await screen.findByText(/Thank you! Working on it as we speak/i);
  expect(reply).toBeInTheDocument();
  fireEvent.click(comment);
  expect(screen.queryByText(/Thank you! Working on it as we speak/i)).toBeNull();

  const backButton = screen.getByText(/Back/i);
  expect(backButton).toBeInTheDocument();
  fireEvent.click(backButton);
  expect(await screen.findByText(/Hacker News/i)).toBeInTheDocument();
});
