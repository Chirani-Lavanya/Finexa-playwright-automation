import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC demo application', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('adds three todos', async () => {
    await todoPage.addTodo('Buy groceries');
    await todoPage.addTodo('Read a book');
    await todoPage.addTodo('Practise Playwright');

    await expect(todoPage.todoItems).toHaveCount(3);
    await expect(todoPage.todoItem('Buy groceries')).toBeVisible();
    await expect(todoPage.todoItem('Read a book')).toBeVisible();
    await expect(todoPage.todoItem('Practise Playwright')).toBeVisible();
  });

  test('completes one todo and updates the remaining counter', async () => {
    await todoPage.addTodo('First task');
    await todoPage.addTodo('Second task');
    await todoPage.addTodo('Third task');

    await todoPage.completeTodo('First task');

    await expect(todoPage.itemsLeft).toContainText('2 items left');
    await expect(todoPage.todoItem('First task').getByRole('checkbox')).toBeChecked();
  });

  test('Active and Completed filters show the correct todos', async ({ page }) => {
    await todoPage.addTodo('Active task');
    await todoPage.addTodo('Completed task');
    await todoPage.completeTodo('Completed task');

    await todoPage.activeFilter.click();
    await expect(page.getByText('Active task', { exact: true })).toBeVisible();
    await expect(page.getByText('Completed task', { exact: true })).toBeHidden();

    await todoPage.completedFilter.click();
    await expect(page.getByText('Completed task', { exact: true })).toBeVisible();
    await expect(page.getByText('Active task', { exact: true })).toBeHidden();
  });

  test('edits a todo using double-click', async () => {
    await todoPage.addTodo('Old task title');
    await todoPage.editTodo('Old task title', 'Updated task title');

    await expect(todoPage.todoItem('Updated task title')).toBeVisible();
    await expect(todoPage.todoItem('Old task title')).toHaveCount(0);
  });

  test('deletes a todo', async () => {
    await todoPage.addTodo('Keep this task');
    await todoPage.addTodo('Delete this task');

    await todoPage.deleteTodo('Delete this task');

    await expect(todoPage.todoItem('Delete this task')).toHaveCount(0);
    await expect(todoPage.todoItem('Keep this task')).toBeVisible();
  });

  test('Clear completed removes only completed todos', async () => {
    await todoPage.addTodo('Keep active task');
    await todoPage.addTodo('Remove completed task');
    await todoPage.completeTodo('Remove completed task');

    await todoPage.clearCompletedButton.click();

    await expect(todoPage.todoItem('Remove completed task')).toHaveCount(0);
    await expect(todoPage.todoItem('Keep active task')).toBeVisible();
    await expect(todoPage.todoItems).toHaveCount(1);
  });
});
