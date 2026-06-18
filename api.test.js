import { test, expect } from '@playwright/test';

test.describe('API Testing — JSONPlaceholder', () => {

  test('GET /posts returns 100 posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveLength(100);
  });

  test('GET /posts/1 returns correct post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post.userId).toBe(1);
  });

  test('POST /posts creates a new post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'My test post',
        body: 'Created by Playwright API test',
        userId: 1,
      }
    });

    expect(response.status()).toBe(201); // 201 = Created
    const post = await response.json();
    expect(post.title).toBe('My test post');
    expect(post.id).toBeDefined();
  });

  test('PUT /posts/1 updates a post', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: {
        id: 1,
        title: 'Updated title',
        body: 'Updated body',
        userId: 1,
      }
    });

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe('Updated title');
  });

  test('DELETE /posts/1 returns 200', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
  });

  test('GET /posts/999 returns 404 for non-existent post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999');
    expect(response.status()).toBe(404);
  });

});